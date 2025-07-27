import AppError from '../utils/AppError.js';
import generateUserToken from '../utils/generateUserToken.js';
import setTokenCookie from '../utils/setTokenCookie.js';
import genrateRandomNum from '../utils/genrateRandomNum.js';
import getVerifyHtml from '../utils/getVerifyHtml.js';
import bcrypt from 'bcrypt';


class AuthService
{
    constructor (userRopo, fastify)
    {
        this.fastify = fastify;
        this.userRopo = userRopo;
        this.cache = fastify.cache;
    }
    
    async verifyUser ({email, verificationCode})
    {
        const user = await this.userRopo.findUserByEmail(email);
        if (!user)
            throw new AppError ('This user not found', 404);
        if (user.is_verified)
            throw new AppError ('This user is already verified', 409);
        const record = await this.cache.get (`reset-code:${email}`);
        if (record !== verificationCode.toString())
            throw new AppError("this code is incorrect", 400);
        await this.cache.del (`reset-code:${email}`);
        await this.userRopo.verifyUser (user.username);
        return {success :true, message: "verification done successfully"};
    }
    
    async sendMail ({email})
    {
        const user =  await this.userRopo.findUserByEmail(email);
        if (!user)
            throw new AppError ('This user not found', 404);
        const verificationCode = genrateRandomNum (100_000, 1000_000);
        const htmlMessage = await getVerifyHtml (verificationCode.toString());
        await this.cache.set (`reset-code:${email}`, `${verificationCode.toString ()}`, 60 * 10);
        this.fastify.mailer.sendMail ({to : email, html : htmlMessage});
        return {success :true, message: "code resende done successfully"};
    }

    async signup ({email, username, password})
    {
        const hashedPassword =  await bcrypt.hash(password, 10); 
        await this.userRopo.createUser (email, username, hashedPassword);
        this.sendMail ({email});
        return {success :true};
    }
    
    async login ({username, password}, reply)
    {
        const user = await this.userRopo.findUserByUsername(username);
        if (!user || !(await bcrypt.compare (password, user.password)))
            throw new AppError('Invalid credentials', 401);
        if (!user.is_verified)
            throw new AppError('Please verify your email before logging in.', 401);
        const tokenAccess = await generateUserToken (this.fastify, user, '15m');
        const tokenRefresh = await generateUserToken (this.fastify, user, '7d');
        setTokenCookie (reply, tokenAccess, 'AccessToken', 15 * 60);
        setTokenCookie (reply, tokenRefresh, 'RefreshToken', 7 * 24 * 60 * 60, '/auth/refresh');
        return {success :true};
    }
    
    async  forgotPassword ({email})
    { 
        const user = await this.userRopo.findUserByEmail (email);
        if (!user)
            throw new AppError ("user doesnt exists", 404);
        this.sendMail ({email});
        return ({success : true});
    }
    
   

    async refreshToken ({RefreshToken}, reply)
    {
        const user = await this.fastify.jwt.verify (RefreshToken);
        const tokenAccess = await generateUserToken (this.fastify, user, '15m');
        setTokenCookie (reply, tokenAccess, 'AccessToken', 15 * 60);
        return {success : true};
    }
    async logout (reply)
    {
         reply.clearCookie ('AccessToken');
         reply.clearCookie ('RefreshToken');
         return {success : true, message : "user logged out successfully."};
    }
}

export default AuthService;

