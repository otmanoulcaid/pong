import { config } from '../config/env.config.js';
import * as schemas from '../schemas/auth.schema.js';

export const friend = async (fastify) => {

    const forward = (request, reply) => {
        try {
            reply.from(`http://${config.servers.CHAT}${request.url}`, {
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
    fastify.get('/add', forward);
    fastify.get('/accept', forward);
    fastify.get('/block', forward);
    fastify.get('/remove', forward);
    fastify.get('/ping', forward);
}
