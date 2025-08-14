import { ChatController } from '../controllers/chat.controller.js'
import { ChatService } from '../services/chat.service.js'
import { FriendService } from '../services/friend.service.js'
import { ChatRepository } from '../repositories/chat.repository.js'
import { FriendRepository } from '../repositories/friend.repository.js'

export const chat = (fastify) => {
    const friendService = new FriendService(fastify, new FriendRepository(fastify.db));
    const chatService = new ChatService(fastify, new ChatRepository(fastify.db), friendService);
    const chatController = new ChatController(fastify, chatService, friendService);

    fastify.get('/:username', { websocket: true }, chatController.manageConnection.bind(chatController));
}
