import { config } from "../config/env.config.js";

export class UserController
{
    constructor(fastify, userService)
    {
        this.userService = userService
        this.fastify = fastify;
    }

    getAllUsers()
    {
        return this.userService.getAll();
    }

    getUserById(id)
    {
        return this.userService.getUserById({ id })
    }

    getUserByUsername(username)
    {
        return this.userService.getUserByUsername({ username })
    }

    async addUser()
    {
        this.#readFromQueue(config.create_user_queue, async (user) => {
            await this.userService.addUser(user);
        });
    }

    async updateUsername()
    {
        this.#readFromQueue(config.update_username_queue, async (user) => {
            const newusername = { username: user.newusername }
            await this.userService.updateUser(user.username, newusername);
        });
    }

    async updateAvatar()
    {
        this.#readFromQueue(config.update_avatar_queue, async (user) => {
            const avatar = { avatar_url: user.avatar_url }
            await this.userService.updateUser(user.username, avatar);
        });
    }

    async #readFromQueue(queue, callback)
    {
        await this.fastify.mq.channel.assertQueue(queue)
        this.fastify.mq.channel.consume(queue, async (msg) => {
            if (msg !== null)
            {
                const user = JSON.parse(msg);
                callback(user)
                this.fastify.mq.channel.ack(msg);
            }
            else
                console.log('Consumer cancelled by server');
        });
    }

    getUsersByKeyword(request, reply)
    {
        return this.userService.getUsersByKeyword(request.params);
    }
}
