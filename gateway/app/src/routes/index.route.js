import { auth } from './auth.route.js'
import { user } from './user.route.js'
import { game } from './game.route.js'
import { chat } from './chat.route.js';

export const routes = (fastify) => {
    // fastify.addHook('onRequest', async (req, res) => {
    //     console.log('==================hoooook===================');
    //     console.log(req.url);
    //     console.log('→ Origin header:', req.headers.origin);
    //     console.log(req.cookies);
    //     console.log('===================hoooook==================');
    // })
    fastify.register(user, { prefix: '/users' });
    fastify.register(chat, { prefix: '/friends' });
    fastify.register(auth, { prefix: '/auth' });
    fastify.register(game, { prefix: '/game' });
};
