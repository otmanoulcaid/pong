import { FriendController } from "../controllers/friend.controller.js"

export const friend = ( fastify ) =>
{
    const friendController = new FriendController()

    fastify.get('/', friendController.getAllFriends.bind(friendController));
    fastify.get('/add', friendController.addFriend.bind(friendController));
    fastify.get('/accept', friendController.acceptFriend.bind(friendController));
    fastify.get('/block', friendController.blockFriend.bind(friendController));
    fastify.get('/remove', friendController.removeFriend.bind(friendController));
    
    // to be removed
    fastify.get('/ping', (req, res)=>{
        res.send({ping: 'pong'});
    })
}
