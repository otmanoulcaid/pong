import { config } from "../config/env.config.js";

export const game = async (fastify) => {
    const forward = (request, reply) => {
        try {
            reply.from(`${config.servers.GAME}${request.url}`, {
                headers: {
                    'X-Request-Origin': fastify.internalToken('game'),
                },
            });
        } catch (error) {
            fastify.log.error(error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }

    fastify.get('/pong/history/:username', forward);
    fastify.get('/pong/summary/:username', forward);
    fastify.get('/pong/leaderboard', forward);

    fastify.get('/doom/history/:username', forward);
    fastify.get('/doom/summary/:username', forward);
    fastify.get('/doom/leaderboard', forward);

    fastify.get('/tournament/history', forward);
    fastify.get('/tournament/:name', forward);

    fastify.get('/ping', forward);
}
