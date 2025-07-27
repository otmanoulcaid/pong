import { config } from "../config/env.config.js";

export class UserController 
{
    constructor(fastify)
    {
        this.fastify = fastify
    }

    #forward(request, reply) {
        try {
            reply.from(config.servers.AUTH, {
                headers: {
                    'X-Request-Origin': fastify.internalToken('user'),
                },
            });
        } catch (error) {
            fastify.log.error(error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }

    getUserProfile(request, reply) {
        this.#forward(request, reply);
    }
    
    async updateAvatar(request, reply) {
        const username = request.params.username;
        const tokenUsername = request.user.username;

        if (tokenUsername !== username)
            return reply.status(403).send({ message: 'You are not authorized to update this avatar' });
        // forward
        this.#forward(request, reply);
    }

    async updateUsernameBio(request, reply) {
        const tokenUsername = request.user.username;
        const username = request.params.username;
        
        if (tokenUsername !== username)
            return reply.status(403).send({ message: 'You are not authorized to update this profile' });
        // forward 
        this.#forward(request, reply);
    }
    
    async updataPassword(request, reply) {
        const username = request.params.username;
        const tokenUsername = request.user.username;
        
        if (tokenUsername !== username)
            return reply.status(403).send({ message: 'You are not authorized to update this password' });
        //forward
        this.#forward(request, reply);
    }
}
