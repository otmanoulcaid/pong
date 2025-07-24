export class UserController 
{
    constructor(fastify)
    {
        this.fastify = fastify
    }

    async getUserProfile(request, reply) {
        try {
            reply.from(process.env.AUTH_SERVICE_URL || `http://localhost:3000${request.url}`, {
                headers: {
                    'X-Request-Origin': fastify.internalToken('user'),
                },
            });
        } catch (error) {
            fastify.log.error(error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async updateAvatar(request, reply) {
        const { avatar } = request.body;
        const username = request.params.username;
        const tokenUsername = request.user.username;

        if (tokenUsername !== username)
            return reply.status(403).send({ message: 'You are not authorized to update this avatar' });

        await this.fastify.sendToQueue('UserUpdateQueue', {
            tokenUsername,
            username,
            avatar,
        });

        reply.status(202).send({ message: 'Avatar update is being processed' });
    }

    async updateUsernameBio(request, reply) {
        const { newusername, bio } = request.body;
        const tokenUsername = request.user.username;
        const username = request.params.username;

        if (tokenUsername !== username)
            return reply.status(403).send({ message: 'You are not authorized to update this profile' });

        await this.fastify.sendToQueue('UserUpdateQueue', {
            tokenUsername,
            newusername,
            username,
            bio,
        });

        reply.status(202).send({ message: 'Username and bio update is being processed' });
    }

    async updataPassword(request, reply) {
        const { oldPassword, newPassword } = request.body;
        const username = request.params.username;
        const tokenUsername = request.user.username;

        if (tokenUsername !== username)
            return reply.status(403).send({ message: 'You are not authorized to update this password' });

        await this.fastify.sendToQueue('UserUpdateQueue', {
            username,
            oldPassword,
            newPassword,
        });

        reply.status(202).send({ message: 'Password update is being processed' });
    }
}
