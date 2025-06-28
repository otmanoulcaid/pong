import * as friendController from '../controllers/friend-controller.js'

export default (fastify) =>
{
    fastify.get('/:uid', friendController.getFriends);

    fastify.post('/add', friendController.addFriend);

    fastify.post('/accept', friendController.acceptFriend);
    
    fastify.post('/remove', friendController.removeFriend);
    
    fastify.post('/block', friendController.blockFriend);
}
