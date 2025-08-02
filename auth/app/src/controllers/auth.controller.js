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

    async verifyTwoFa (req, reply)
    {
        const result = await this.authService.verifyTwoFa (req.body, req.cookies, reply);
        reply.send (result);
    }

    async forgotPassword (req, reply)
    {
        const result = await this.authService.forgotPassword (req.body);
        reply.send (result);
    }
    
    async validateResetToken (request, reply)
    {
        const { email, token } = request.body;
        const respone = await this.authService.validateResetToken(token, email);
        reply.send({
            success: true,
            mesage: 'token validated',
            email: respone.email
        });
    }

    async resetPassword (request, reply)
    {
        const {password, email, token} = request.body;
        this.authService.resetPassword(token, email, password);
        reply.send({
            success: true,
            message: 'password updated successfully'
        })
    }
}

export default AuthController;