import { auth } from './auth.route.js'
import { user } from './user.route.js'
import { game } from './game.route.js'
import { friend } from './friend.route.js';

export const routes = (fastify) => {
    fastify.register(user, { prefix: '/users' });
    fastify.register(friend, { prefix: '/friends' });
    fastify.register(auth, { prefix: '/auth' });
    fastify.register(game, { prefix: '/game' });
    fastify.get('/ws/check', async (request, reply) => {
        try {
            await fastify.authenticate(request, reply);
            reply.header('x-auth-user', request.user.username).status(204).send();
        } catch (error) {
            console.log(error);
            reply.status(401).send(error.message)
        }
    })
};
