import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';

class AuthService
{
    constructor(userService)
    {
        this.userService = userService;
    }

    async signIn({ username }, ...fields)
    {
        try {
            const { data } = await this.userService.getUser(username, ...fields);
            return {stat: true, data};
        } catch (error) {
            error.stat = false;
            return error
        }
    }

    async signUp( paylod )
    {
        try {
            const response = await this.userService.createUser(paylod);
            if (response.user)
            {
                const { username, email} = response.user
                return { stat: true, user: { username, email } };
            }
            throw new Error('username or email already used');
        }
        catch ( error ) {
            error.stat = false;
            return error
        }
    }

    generateToken(payload)
    {
        return jwt.sign(
            payload, 
            process.env.JWT_SECRET || 'random_secret', 
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );
    }

    async sendOTP(body)
    {
        try {
            const { user } = await this.userService.getUser({email: body.email});
            if (!user)
                throw new Error('no user exit with the provided email');
            const transporter = nodemailer.createTransport({
                service: process.env.MAIL_PROVIDER ||'gmail',
                auth: {
                    user: process.env.PONG_EMAIL,
                    pass: process.env.PONG_PASS
                }
            });
            const otp = Math.floor(Math.random() * 864198 + 123456);  // otp will be between 123456 and 987654
            //add the  otp in redis instance with an amount of time to expire

            const mailOptions = {
                from: `'ping pong' ${process.env.PONG_EMAIL}`,
                to: body.email,
                subject: 'restore your password',
                html: `<h1>${otp}</h1>`
            };
            await transporter.sendMail(mailOptions);
            return { stat: true };
        } 
        catch ( error ) {
            error.stat = false;
            return error;
        }
    }

    async validOtp(body)
    {
        // verify the otp if it valid or not and expire it if it is valid
        return { stat: true };
    }
}

export { AuthService };
