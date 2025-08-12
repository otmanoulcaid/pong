import * as schemas from '../schemas/user.schema.js'
import { UserController } from '../controllers/user.controller.js'
import { complitProfileSchema, resetPasswordSchema } from '../schemas/auth.schema.js';

export const user = async (fastify) => {
    const userController = new UserController(fastify);

    fastify.get ('/:username' ,{onRequest: [fastify.authenticate]}, userController.getUserProfile.bind (userController));

    fastify.put ("/profile/avatar/:username", {
            onRequest: [fastify.authenticate],
            schema : schemas.updataAvatarSchema,
        },
        userController.updateAvatar.bind (userController)
    );

    fastify.put ('/profile/bio/:username', {
            onRequest: [fastify.authenticate],
            schema : schemas.updateBioSchema,
        },
        userController.updateBio.bind (userController)
    );

    fastify.put ('/profile/username/:username', {
            onRequest: [fastify.authenticate],
            schema : schemas.updateUsernameSchema,
        },
        userController.updateUsername.bind (userController)
    );

    fastify.put ('/profile/password/:username', {
            schema : schemas.updatePasswordSchema,
            onRequest: [fastify.authenticate]
        },
        userController.updataPassword.bind (userController)
    );


    fastify.post('/complete-profile/:username', {
            schema: complitProfileSchema
        }, 
        userController.comleteProfile.bind (userController)
    );

    fastify.post('/reset-password', {
            schema: resetPasswordSchema
        },
        userController.forward.bind(userController)
    );

    fastify.delete('/:username', {
            onRequest: [fastify.authenticate],
        },
        userController.forward.bind(userController)
    );
}
