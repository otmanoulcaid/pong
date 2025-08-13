import { UserController } from "../controllers/user.controller.js"
import { FriendController } from "../controllers/friend.controller.js"
import { UserService } from "../services/user.service.js"
import { UserRepository } from "../repositories/user.repository.js"
import { FriendRepository } from "../repositories/friend.repository.js";
import { FriendService } from "../services/friend.service.js"

export const internal = ( fastify ) =>
{
    const userService = new UserService(new UserRepository(fastify.db));
    const userController = new UserController(fastify, userService);
    const friendService = new FriendService(new FriendRepository(fastify.db));
    const friendController = new FriendController(fastify, friendService);

    fastify.get('/users/:username', userController.getUserByUsername.bind(userController));
    fastify.get('/friends/:username', friendController.friendship.bind(userController));
}
