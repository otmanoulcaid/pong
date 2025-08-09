import { ChatController } from '../controllers/chat.controller.js'
import { ChatService } from '../services/chat.service.js'
import { FriendService } from '../services/friend.service.js'
import { ChatRepository } from '../repositories/chat.repository.js'
import { FriendRepository } from '../repositories/friend.repository.js'
import { UserRepository } from '../repositories/user.repository.js'
import { UserService } from '../services/user.service.js'


export const chat = (fastify) => {
    const chatService = new ChatService(new ChatRepository(fastify.db));
    const userService = new UserService(new UserRepository(fastify.db));
    const friendService = new FriendService(fastify, new FriendRepository(fastify.db), userService);
    const chatController = new ChatController(fastify, chatService, friendService, userService);

    fastify.get('/:username', { websocket: true }, chatController.manageConnection.bind(chatController));
}
