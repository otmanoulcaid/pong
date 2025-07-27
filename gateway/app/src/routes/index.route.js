import { auth } from './auth.route.js'
import { user } from './user.route.js'
import { game } from './game.route.js'
import { metrics } from './metrics.route.js'

export const routes = (fastify) => {
    fastify.register(user, { prefix: '/users' });
    fastify.register(auth, { prefix: '/auth' });
    fastify.register(game, { prefix: '/game' });
    fastify.register(metrics, { prefix: '/metrics' });

    // to be removed
    fastify.get('/ping', (req, res)=>{
        res.send({ping: 'pong'});
    })
};
