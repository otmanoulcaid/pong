import UserService from '../services/user.service.js';
import UserController from '../controllers/user.controller.js';
import UserRepository from '../repository/user.repository.js';

export default async (fastify) => 
{
    const userRopo = new UserRepository(fastify.db)
    const userService = new UserService (userRopo, fastify);
    const userController = new UserController(userService);

    fastify.get ('/users/profile/:username' , userController.getUserProfile.bind (userController));
    
    fastify.put ("/users/profile/avatar/:username" , userController.updateAvatar.bind (userController));

    fastify.put ('/users/profile/username-bio/:username',userController.updateUsernameBio.bind (userController));
    
    fastify.put ('/users/profile/password/:username', userController.updataPassword.bind (userController));

    fastify.post ('/internal/users', userController.createUser.bind (userController));
    fastify.post ('/internal/users/avatar', userController.setAvatarurl.bind (userController));
    fastify.post ('/internal/users/password', userController.setPasswordByEmail.bind (userController));
    fastify.get('/internal/users/email/:email', userController.findUserByEmail.bind (userController));
    fastify.get ('/internal/users/username/:username', userController.findUserByUsername.bind (userController));
}
