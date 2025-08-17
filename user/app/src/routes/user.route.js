
import UserService from '../services/user.service.js';
import UserController from '../controllers/user.controller.js';
import UserRepository from '../repository/user.repository.js';

export default (fastify) => 
{
    const userRopo = new UserRepository(fastify.db)
    const userService = new UserService (userRopo, fastify);
    const userController = new UserController(userService);

    fastify.get ('/:username' , userController.getUserProfile.bind (userController));

    fastify.put ("/profile/avatar/:username" , userController.updateAvatar.bind (userController));
    fastify.put ('/profile/bio/:username',userController.updateBio.bind (userController));
    fastify.put ('/profile/username/:username',userController.updateUsername.bind (userController));
    fastify.put ('/profile/password/:username', userController.updataPassword.bind (userController));

    fastify.post ('/complete-profile/:username', userController.completeProfile.bind (userController));
    fastify.post ('/reset-password', userController.resetPassword.bind (userController));

    fastify.delete ('/:username', userController.deleteAccount.bind (userController));
    
        // to be removed
    fastify.get('/ping', (req, res)=>{
        res.send({ping: 'pong'});
    })
}
