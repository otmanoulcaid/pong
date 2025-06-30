import fp from "fastify-plugin";
import { UserService } from './UserService.js';
import { FriendService } from './FriendService.js';

export default fp(async (fastify) => {
    /**
     * user service is the most used service to fetch data related to the users
     * so that all services can share the same UserService object
     * */
    const userService = new UserService(fastify.UserRepository);

    
    
    fastify.decorate('userService', userService);
    fastify.decorate('friendService', new FriendService(fastify.friendRepository));
    fastify.decorate('gameService', new GameService(fastify.gameRepository));
    fastify.decorate('playerService', new FriendService(fastify.friendRepository));
    fastify.decorate('gameService', new GameService(
        fastify.gameRepository,
        fastify.tournamentRepository,
        fastify.playerRepository
    ));
    // fastify.decorate('chatService', new ChatService(fastify.chatDao));

});