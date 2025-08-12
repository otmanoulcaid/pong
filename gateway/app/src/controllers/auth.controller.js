import { config } from "../config/env.config.js";
import AppError from "../utils/AppError.js";
export class AuthController 
{
	constructor(fastify)
	{
		this.fastify = fastify;
	}

	forward(request, reply) 
	{
		try {
			reply.from(`${config.servers.AUTH}${request.url}`, {
				headers: {
					'X-Request-Origin': this.fastify.internalToken('user'),
				},
				body : request.body,
			});
		} catch (error) {
			reply.status(500).send({ error: 'Internal Server Error' });
		}
	}

	async check(req, reply)
	{
		await this.fastify.authenticate(req, reply);
		reply.header('X-Auth-User', req.user.username);
		reply.send({ success: true });
	}
}
