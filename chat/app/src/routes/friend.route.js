import { FriendService } from "../services/friend.service.js"
import { FriendController } from "../controllers/friend.controller.js"
import { FriendRepository } from "../repositories/friend.repository.js"

export const friend = ( fastify ) =>
{
    const friendRepository = new FriendRepository(fastify.db)
    const friendService = new FriendService(friendRepository)
    const friendController = new FriendController(friendService)

    fastify.get('/:username', friendController.getAllFriends.bind(friendController));
    fastify.post('/add', friendController.addFriend.bind(friendController));
    fastify.put('/accept', friendController.acceptFriend.bind(friendController));
    fastify.put('/block', friendController.blockFriend.bind(friendController));
    fastify.delete('/remove', friendController.removeFriend.bind(friendController));
    
    // to be removed
    fastify.get('/ping', (req, res)=>{
        res.send({ping: 'pong'});
    })
}
