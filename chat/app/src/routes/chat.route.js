import { ChatController } from '../controllers/chat.controller.js'
import { ChatService } from '../services/chat.service.js'
import { FriendService } from '../services/friend.service.js'
import { ChatRepository } from '../repositories/chat.repository.js'
import { FriendRepository } from '../repositories/friend.repository.js'


export const chat = (fastify) => {
    const chatService = new ChatService(new ChatRepository(fastify.db));
    const friendService = new FriendService(new FriendRepository(fastify.db));
    const chatController = new ChatController(chatService, friendService);
    fastify.get('/chat/:username', { websocket: true }, chatController.manageConnection.bind(chatController));
}
