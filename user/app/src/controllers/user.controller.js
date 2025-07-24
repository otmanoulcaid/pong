class UserController
{
    constructor (userService)
    {
        this.userService = userService;
    }
   async  getUserProfile (req, reply)
    {
        const result = await this.userService.getUserProfile (req.params);
        return reply.status (200).send(result);
    }

    async updateUsernameBio (req, reply)
    {
        const newusername = req.body?.newusername;
        const bio = req.body?.bio;
        const result = await this.userService.updateUsernameBio (req.params, newusername, bio);
        return reply.status (200).send(result);
    }

    async updataPassword (req, reply)
    {
        const result = await this.userService.updataPassword (req.params, req.body);
        return reply.status (200).send(result);
    }
    
    async updateAvatar (req, reply)
    {
        const result = await this.userService.updateAvatar (req.params, req.body);
        return reply.status (200).send(result);
    }

    async setPasswordByEmail (req, reply)
    {
        const result = await this.userService.setPasswordByEmail (req.body);
        return reply.status (200).send(result);
    }

    async setAvatarurl (req, reply)
    {
        const result = await this.userService.setAvatarurl (req.body);
        return reply.status (200).send(result);
    }

    async createUser (req, reply)
    {
        const result = await this.userService.createUser (req.body);
        return reply.status (200).send(result);
    }

    async findUserByUsername (req, reply)
    {
        const result = await this.userService.findUserByUsername (req.params);
        return reply.status (200).send(result);
    }

    async findUserByEmail (req, reply)
    {
        const result = await this.userService.findUserByEmail (req.params);
        return reply.status (200).send(result);
    }
}

export default UserController;