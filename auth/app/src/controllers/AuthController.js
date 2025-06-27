export class AuthController
{
    constructor(authService)
    {
        this.authService = authService;
    }

    async signin (request, reply)
    {
        const response = await this.authService.signIn(request.body, 'username', 'email')
        if (response.stat)
        {
            const token = this.authService.generateToken(response.data);
            return reply.header('Set-Cookie', `token=${token}; Max-Age=5184000`)
                    .send({message: 'logged successfuly'});
        }
        return reply.code(400).send({ error : response.message });
    }

    async refreshToken (request, reply)
    {

    }

    async signup (request, reply)
    {
        const response = await this.authService.signUp(request.body)
        if (response.stat)
        {
            const token = this.authService.generateToken(response.user);
            return reply.header('Set-Cookie', `token=${token}; Max-Age=5184000`)
                        .send({data: "ok"});
        }
        return reply.code(400).send({ error: response.message }) //?? code ??
    }

    async logout(request, reply)
    {
        return reply.header('Set-Cookie', 'token=; Max-Age=0')
                    .send({ data: 'logout' });
    }

    async getOtp (request, reply)
    {
        const response = { stat: true };  // success test unit
        // const response = { stat: false, message: 'fail use case test' }; 
        // const response = await this.authService.sendOTP(request.body); // prod instruction
        if (response.stat)
            return reply.send({ 
                status: "otp sent",
                email: request.body.email 
            });
        return reply.code(400).send({ error: response.message });
    }

    async verifyOtp (request, reply)
    {
        const response = await this.authService.validOtp(request.body)
        if (response.stat)
            return reply.send({data: "temporary otp validion"})
        return reply.code(400).send({ error: response.message})
    }

    async preflight (request, reply)
    {
        const allowedOrigins = process.env.ALLOWED_ORIGIN
        ? process.env.ALLOWED_ORIGIN.split(',').map(o => o.trim())
        : [];
    
        const origin = request.headers.origin;
        if (!origin || !allowedOrigins.includes(origin))
            return reply.code(403).send({ 
                error: 'Origin not allowed by CORS policy'
            });

        return reply
            .header('Access-Control-Allow-Origin', origin)
            .header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
            .header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
}
