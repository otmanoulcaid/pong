import { config } from '../config/env.config.js';

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
	};

	fastify.get('/pong/history/:username', { onRequest: [fastify.authenticate] }, forward);
	fastify.get('/pong/summary/:username', { onRequest: [fastify.authenticate] }, forward);
	fastify.get('/pong/leaderboard', { onRequest: [fastify.authenticate] }, forward);

	fastify.get('/doom/history/:username', { onRequest: [fastify.authenticate] }, forward);
	fastify.get('/doom/summary/:username', { onRequest: [fastify.authenticate] }, forward);
	fastify.get('/doom/leaderboard', { onRequest: [fastify.authenticate] }, forward);

	fastify.get('/tournament/history', { onRequest: [fastify.authenticate] }, forward);
	fastify.get('/tournament/:name', { onRequest: [fastify.authenticate] }, forward);

	fastify.get('/ping', { onRequest: [fastify.authenticate] }, forward);
};
