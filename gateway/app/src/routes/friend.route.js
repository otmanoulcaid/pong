import { config } from '../config/env.config.js';
import * as schemas from '../schemas/auth.schema.js';

export const friend = async (fastify) => {

    const forward = (request, reply) => {
        try {
            reply.from(`${config.servers.CHAT}${request.url}`, {
                headers: {
                    'X-Request-Origin': fastify.internalToken('gateway'),
                },
            });
        } catch (error) {
            fastify.log.error(error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }

    fastify.get('/', forward);
    fastify.post('/add', forward);
    fastify.post('/accept', forward);
    fastify.post('/block', forward);
    fastify.post('/remove', forward);
    fastify.get('/ping', forward);
}
