import { auth } from './auth.route.js'
import { user } from './user.route.js'
import { friend } from './friend.route.js'
import { game } from './game.route.js'
import { metrics } from './metrics.route.js'

export const routes = (fastify) => {
    fastify.register(user, { prefix: '/users' });
    fastify.register(friend, { prefix: '/friends' });
    fastify.register(auth, { prefix: '/auth' });
    fastify.register(game, { prefix: '/game' });
    fastify.register(metrics, { prefix: '/metrics' });
};
