class AuthController 
{
    constructor (authService)
    {
        this.authService = authService;
    }
    async signup (req, reply)
    {
        const result = await this.authService.signup (req.body);
        reply.send (result);
    }
    async login (req, reply)
    {
        const result = await this.authService.login (req.body, reply);
        reply.send (result);
    }
    
    async refreshToken (req, reply)
    {
        const result = await this.authService.refreshToken (req.cookies, reply);
        reply.send (result);

    }
    async logout (req, reply)
    {
        const result = await this.authService.logout (reply);
        reply.send (result);
    }

    async forgotPassword (req, reply)
    {
        const result = await this.authService.forgotPassword (req.body);
        reply.send (result);
    }

    async verifyUser (req, reply)
    {
        const result = await this.authService.verifyUser (req.body);
        reply.send (result);
    }

    async sendMail (req, reply)
    {
        const result = await this.authService.sendMail (req.body);
        reply.send (result);
    }

}

export default AuthController;