import AuthController from '../controllers/auth.controller.js'
import GoogleAuthController from '../controllers/google-auth.controller.js'

export const routes = async (fastify) =>
{
    const authController = new AuthController()
    const googleAuthController = new GoogleAuthController()

    fastify.post ('/refresh', authController.refreshToken.bind (authController))
    fastify.post ('/signup' ,authController.signup.bind (authController))
    fastify.post ('/login', authController.login.bind (authController));
    fastify.post ('/logout', authController.logout.bind (authController));

    fastify.post ('/forgot-password', authController.forgotPassword.bind (authController));
    fastify.post ('/reset-password', authController.resetPassword.bind (authController));

    fastify.post ('/verify-user', authController.verifyUser.bind (authController));
    fastify.post ('/resend-code', authController.sendMail.bind (authController));
    
    fastify.post ('/complite-profile/:username', authController.completeProfile.bind (authController));
    
    fastify.get ('/callback', googleAuthController.googleCallback.bind (googleAuthController));
}
