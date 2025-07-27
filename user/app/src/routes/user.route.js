
import fp from 'fastify-plugin';
import UserService from '../services/user.service.js';
import UserController from '../controllers/user.controller.js';
import UserRepository from '../repository/user.repository.js';

export default fp
(
    async (fastify) => 
        {
            const userRopo = new UserRepository(fastify.db)
            const userService = new UserService (userRopo, fastify);
            const userController = new UserController(userService);
    
            fastify.get ('/api/me/profile/:username' , userController.getUserProfile.bind (userController));
            
            fastify.put ("/api/me/profile/update/avatar/:username" , userController.updateAvatar.bind (userController));

            fastify.put ('/api/me/profile/update/username-bio/:username',userController.updateUsernameBio.bind (userController));
            
            fastify.put ('/api/me/profile/update/password/:username', userController.updataPassword.bind (userController));

            fastify.post ('/internal/users', userController.createUser.bind (userController));
            fastify.post ('/internal/users/avatar', userController.setAvatarurl.bind (userController));
            fastify.get('/internal/users/email/:email', userController.findUserByEmail.bind (userController));
            fastify.get ('/internal/users/username/:username', userController.findUserByUsername.bind (userController));

            fastify.put ('/internal/users/state', userController.verifyUser.bind (userController));
    
            fastify.post ('/complite-profile/:username', userController.completeProfile.bind (userController));
            fastify.post ('/reset-password', userController.resetPassword.bind (userController));
            
                // to be removed
            fastify.get('/ping', (req, res)=>{
                res.send({ping: 'pong'});
            })
        }
)

