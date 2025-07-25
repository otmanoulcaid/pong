import { FriendController } from "../controllers/friend.controller.js"
import { friendSchema } from "../schemas/friend.schema.js";

export const friend = ( fastify ) =>
{
    const friendController = new FriendController()

    fastify.get('/', friendController.getAllFriends.bind(friendController));
    fastify.post('/add', { schema: friendSchema }, friendController.addFriend.bind(friendController));
    fastify.post('/accept', { schema: friendSchema }, friendController.acceptFriend.bind(friendController));
    fastify.post('/block', { schema: friendSchema }, friendController.blockFriend.bind(friendController));
    fastify.post('/remove', { schema: friendSchema }, friendController.removeFriend.bind(friendController));
    fastify.get('/ping', (req, res) => {
        return res.send({ping: 'pong'})
    });
}
