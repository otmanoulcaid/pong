import { FriendController } from "../controllers/friend.controller.js"

export const friend = ( fastify ) =>
{
    const friendController = new FriendController()

    fastify.get('/', friendController.getAllFriends.bind(friendController));
    fastify.post('/add', friendController.addFriend.bind(friendController));
    fastify.post('/accept', friendController.acceptFriend.bind(friendController));
    fastify.post('/block', friendController.blockFriend.bind(friendController));
    fastify.post('/remove', friendController.removeFriend.bind(friendController));
    fastify.get('/ping', (req, res) => {
        return res.send({pong: 'pong'})
    })
}
