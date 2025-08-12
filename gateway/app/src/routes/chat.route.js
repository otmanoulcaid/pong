import { config } from "../config/env.config.js";

export const chat = async ( fastify ) => {

    const forward = (request, reply) => {
		try {
			reply.from(`${config.servers.CHAT}${request.url}`, {
				headers: {
					'X-Request-Origin': fastify.internalToken('user'),
				},
				body : request.body,
			});
		} catch (error) {
            console.log(error);
			reply.status(500).send({ error: 'Internal Server Error' });
		}
	}

    fastify.get('/:username', forward);
  
    fastify.put('/accept', forward);
  
    fastify.post('/add', forward);
  
    fastify.put('/block', forward);
  
    fastify.get('/ping', forward);
  
    fastify.delete('/remove', forward);

	fastify.get('/u/:keyword', forward);
}
