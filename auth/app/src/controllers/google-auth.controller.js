import { config } from "../config/env.config.js";

class GoogleAuthController {
  constructor(googleAuthService) {
    this.googleAuthService = googleAuthService;
  }

  async googleCallback(req, reply) {
    try {
      await this.googleAuthService.createUserGoogle(req, reply);
      reply.code(302).header("Location", config.domain).send();
    } catch (error) {
      console.log(error);
      return reply.status(503).send({ message: "google service unavailable" });
    }
  }
}

export default GoogleAuthController;
