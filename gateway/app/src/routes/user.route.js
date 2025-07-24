import * as schemas from '../schemas/user.schema.js'
import { UserController } from '../controllers/user.controller.js'

export const user = async (fastify) => {
    const userController = new UserController(fastify);

    fastify.get ('/profile/:username' ,{onRequest: [fastify.authenticate]}, userController.getUserProfile.bind (userController));

    fastify.put ("/profile/avatar/:username" ,{
        onRequest: [fastify.authenticate],
        schema : schemas.updataAvatarSchema,
    } , userController.updateAvatar.bind (userController));

    fastify.put ('/profile/username-bio/:username', 
    {
        onRequest: [fastify.authenticate],
        schema : schemas.updateUsernameBioSchema,
    },
    userController.updateUsernameBio.bind (userController));

    fastify.put ('/profile/password/:username',
    {
        schema : schemas.updatePasswordSchema,
        onRequest: [fastify.authenticate]
    }
    , userController.updataPassword.bind (userController));
}