import { config } from "../config/env.config.js";
import AppError from "../utils/AppError.js";
export class UserController 
{
    constructor(fastify)
    {
        this.fastify = fastify;
    }

    async forwardMultiPart (request, reply , method)
    {
        const form = new FormData ();
        const [value, buf] = [request.body?.bio?.value, request.body.avatar?._buf];

        if (!value && !buf)
            throw new AppError ('Empty Request', 400);
        if (request.body?.bio?.value)
        {
            form.append('bio', request.body.bio.value);
        }
        if (request.body.avatar?._buf)
        {
            const fileBuffer = request.body.avatar._buf;
            const fileName = request.body.avatar.filename;
            const mimeType = request.body.avatar.mimetype;
    
            const file = new File ([fileBuffer], fileName,{type : mimeType});
            form.append ('avatar', file);
        }
        const response = await fetch (`${config.servers.USER}${request.url}`, 
        {
            method,
            headers : {
                'X-Request-Origin': this.fastify.internalToken('user'),
              },
            body: form,
        })

        if (!response.ok)
        {
            let res = await response.json();
            throw new AppError(res.message,res.statusCode)
        }
        const result = await response.json();
        return reply.send (result);
    }

    forward(request, reply) 
    {
        console.log('======================== forward ======================');
        console.log(`Forwarding request to ${config.servers.USER}${request.url}`);
        console.log('======================== forward ======================');
        try {
            reply.from(`${config.servers.USER}${request.url}`, {
                headers: {
                    'X-Request-Origin': this.fastify.internalToken('user'),
                },
                body : request.body
            });
        } catch (error) {
          reply.status(500).send({ error: 'Internal Server Error' });
        }
    }

    getUserProfile(request, reply) 
    {
        this.forward(request, reply);
    }

    async updateAvatar(request, reply) {
        const username = request.params.username;
        const tokenUsername = request.user.username;

        if (tokenUsername !== username)
            return reply.status(403).send({ message: 'You are not authorized to update this avatar' });
        return await this.forwardMultiPart(request, reply, 'PUT');
    }

    async updateUsername(request, reply) {
        const tokenUsername = request.user.username;
        const username = request.params.username;
        
        if (tokenUsername !== username)
            return reply.status(403).send({ message: 'You are not authorized to update this profile' });
        this.forward(request, reply);
    }

    async updateBio(request, reply) {
        const tokenUsername = request.user.username;
        const username = request.params.username;
        
        if (tokenUsername !== username)
            return reply.status(403).send({ message: 'You are not authorized to update this profile' });
        this.forward(request, reply);
    }
    
    async updataPassword(request, reply) {

        const username = request.params.username;
        const tokenUsername = request.user.username;

        if (tokenUsername !== username)
            return reply.status(403).send({ message: 'You are not authorized to update this password' });
        this.forward(request, reply);
    }
    
    async deleteAccount(request, reply) {

        const username = request.params.username;
        const tokenUsername = request.user.username;

        if (tokenUsername !== username)
            return reply.status(403).send({ message: 'You are not authorized to update this password' });
        this.forward(request, reply);
    }
    
    async comleteProfile (request, reply)
    {
        return this.forwardMultiPart(request, reply, 'POST');
    }
}

