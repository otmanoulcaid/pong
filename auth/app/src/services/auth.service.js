import AppError from "../utils/AppError.js";
import generateUserToken from "../utils/generateUserToken.js";
import setTokenCookie from "../utils/setTokenCookie.js";
import genrateRandomNum from "../utils/genrateRandomNum.js";
import bcrypt from "bcrypt";
import { config } from "../config/env.config.js";

class AuthService {
  constructor(userRopo, fastify) {
    this.fastify = fastify;
    this.userRopo = userRopo;
    this.cache = fastify.cache;
  }

  async verifyUser({ email, verificationCode }, reply) {
    const user = await this.userRopo.findUserByEmail(email);
    if (!user) throw new AppError("This user not found", 404);
    if (user.is_verified)
      throw new AppError("This user is already verified", 409);
    const record = await this.cache.get(email);
    if (record != verificationCode)
      throw new AppError("this code is incorrect", 400);
    await this.userRopo.verifyUser(user.username);
    await this.cache.del(email);
    const tokenAccess = await generateUserToken(this.fastify, user, "15m");
    const tokenRefresh = await generateUserToken(this.fastify, user, "7d");
    setTokenCookie(reply, tokenAccess, "AccessToken", 15 * 60);
    setTokenCookie(
      reply,
      tokenRefresh,
      "RefreshToken",
      7 * 24 * 60 * 60,
      "/api/v1/auth/refresh"
    );
    return { success: true, message: "verification done successfully" };
  }

  async sendMail({ email }) {
    const user = await this.userRopo.findUserByEmail(email);
    if (!user) throw new AppError("This user not found", 404);
    return this.#sendOtp(email);
  }

  async #sendOtp(email) {
    const verificationCode = genrateRandomNum(100_000, 1_000_000);
    await this.cache.set(email, verificationCode.toString(), 60 * 10);
    await this.fastify.channel.assertQueue(config.notification_queue);
    await this.fastify.channel.sendToQueue(
      config.notification_queue,
      Buffer.from(
        JSON.stringify({
          service: 'mail',
          content: {
            to: email,
            subject: "code verification",
            body: verificationCode,
            type: "OTP",
          }
        })
      )
    );

    return { success: true, message: "code sent successfully" };
  }

  async verifyTwoFa({ email, verificationCode }, cookies, reply) {
    const user = await this.userRopo.findUserByEmail(email);
    if (!user) throw new AppError("invalid credentials, please try again", 400);
    if (!user.is_verified)
      throw new AppError("Please verify your email before login.", 401);
    const token = cookies.twoFaToken;
    if (!token)
      throw new AppError("Please login before passing to 2FA process.", 403);
    try {
      const decode = this.fastify.jwt.decode(token);
      if (user.username != decode.username || decode.email != user.email)
        throw new AppError("invalid credentials", 401);
    } catch (error) {
      console.log(error);
      throw new AppError("invalid credentials", 401);
    }
    const record = await this.cache.get(email);
    if (record != verificationCode)
      throw new AppError("this code is incorrect", 400);
    await this.cache.del(email);
    // await this.fastify.jwt.destroy('twoFaToken')
    const tokenAccess = await generateUserToken(this.fastify, user, "15m");
    const tokenRefresh = await generateUserToken(this.fastify, user, "7d");
    setTokenCookie(reply, tokenAccess, "AccessToken", 15 * 60);
    setTokenCookie(
      reply,
      tokenRefresh,
      "RefreshToken",
      7 * 24 * 60 * 60,
      "/api/v1/auth/refresh"
    );
    return { success: true, message: "verification done successfully" };
  }

  async signup({ email, username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRopo.createUser(email, username, hashedPassword);
    const result = await this.#sendOtp(email);
    result.username = username;
    result.email = email;
    return result;
  }

  async login({ username, password }, reply) {
    const user = await this.userRopo.findUserByUsername(username);
    if (!user) throw new AppError("user not found", 404);
    if (!(await bcrypt.compare(password, user.password)))
      throw new AppError("Invalid credentials", 400);
    if (!user.is_verified)
      throw new AppError("Please verify your email before logging in.", 401);
    const twoFaToken = await generateUserToken(this.fastify, user, "10");
    setTokenCookie(
      reply,
      twoFaToken,
      "twoFaToken",
      10 * 60,
      "/api/v1/auth/verify-2fa"
    );
    const result = await this.#sendOtp(user.email);
    result.username = user.username;
    result.email = user.email;
    return result;
  }

  async refreshToken({ RefreshToken }, reply) {
    const user = await this.fastify.jwt.verify(RefreshToken);
    const tokenAccess = await generateUserToken(this.fastify, user, "15m");
    setTokenCookie(reply, tokenAccess, "AccessToken", 15 * 60);
    return { success: true };
  }
  async logout(reply) {
    reply.clearCookie("AccessToken");
    reply.clearCookie("RefreshToken");
    reply.clearCookie("LoginTokenSend");
    return { success: true, message: "user logged out successfully." };
  }

  #generateToken(jwt) {
    let token = "";
    let chars = jwt.split("");
    let length = chars.length;
    for (let i = 0; i < 30; i++)
      token += chars[Math.floor(Math.random() * length)];
    return token;
  }

  async forgotPassword({ email }) {
    const user = await this.userRopo.findUserByEmail(email);
    if (!user) throw new AppError("user doesnt exists", 404);
    const jwt = this.fastify.jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      { expiresIn: 10 * 60 }
    );
    let token = this.#generateToken(jwt);
    this.fastify.cache.set(token, jwt, 10 * 60);
    await this.fastify.channel.assertQueue(config.notification_queue);
    const notification = {
      service: "mail",
      content: {
        to: email,
        subject: "reset your password",
        body: `http://localhost:3000/auth/reset-password?token=${token}`,
        type: "OTT",
      },
    };
    await this.fastify.channel.sendToQueue(
      config.notification_queue,
      Buffer.from(JSON.stringify(notification))
    );
    return {
      success: true,
      email: user.email,
      message: "an email is sent to you, please check your email box",
    };
  }

  async resetPassword(token, password, confirmPass) {
    const fullToken = await this.fastify.cache.get(token);
    if (!fullToken) throw new AppError("not a valid token", 400);
    let user;
    try {
      user = await this.fastify.jwt.decode(fullToken);
    } catch (error) {
      throw new AppError("not a valid token", 400);
    }
    if (password != confirmPass)
      throw new AppError("the password should be the same", 400);
    await this.userRopo.resetPassword(user.email, password);
    this.fastify.cache.del(token);
  }
}

export default AuthService;
