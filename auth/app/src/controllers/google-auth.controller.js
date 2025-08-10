class GoogleAuthController
{
    constructor(googleAuthService)
    {
      this.googleAuthService = googleAuthService;
    }
  
    async googleCallback(req, reply) {
      try {
        await this.googleAuthService.createUserGoogle(req, reply);
        reply.code(302)
            .header('Location', 'http://www.google.com')
            .send();
      } catch (error) {
        console.log('===================log in oauth controller===================');
        console.log(error);
        console.log('===================log in oauth controller===================');
        return reply.status(500).send({ err: error.message });
      }
    }
  }
  
  export default GoogleAuthController;
  