class UserController
{
    constructor (userService)
    {
        this.userService = userService;
    }
    
    async  getUserProfile (req, reply)
    {
        console.log(req.params);
        const result = await this.userService.getUserProfile (req.params);
        return reply.status (200).send(result);
    }

    async updateUsername (req, reply)
    {
        const newusername = req.body.newusername;
        const result = await this.userService.updateUsername (req.params, newusername);
        return reply.status (200).send(result);
    }

    async updateBio (req, reply)
    {
        const bio = req.body.bio;
        const result = await this.userService.updateBio (req.params, bio);
        return reply.status (200).send(result);
    }

    async updataPassword (req, reply)
    {
        const result = await this.userService.updatePassword (req.params, req.body);
        return reply.status (200).send(result);
    }

    async updateAvatar (req, reply)
    {
        const result = await this.userService.updateAvatar (req.params, req.body?.avatar);
        return reply.status (200).send(result);
    }

    async  verifyUser (req, reply)
    {
        req.body = JSON.parse(req.body);
        const result = await this.userService.verifyUser(req.body);
        return reply.status (200).send(result);
    }

    async updateAvatarurl (req, reply)
    {
        req.body = JSON.parse(req.body);
        const result = await this.userService.updateAvatarurl (req.body);
        return reply.status (200).send(result);
    }

    async createUser (req, reply)
    {
        req.body = JSON.parse(req.body);
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

    async resetPassword (req, reply)
    {
        const result = await this.userService.resetPassword (JSON.parse(req.body));
        reply.send (result);
    }
    
    async completeProfile (req, reply)
    {
        const bio = req.body?.bio?.value;
        const username = req.params?.username;
        const avatar = req.body?.avatar
        
        if (!bio && !avatar)
            return reply.send ({success : true, message :"nothing to update"})
        const result = await this.userService.completeProfile (bio, avatar , username);
        reply.send (result);
    }

    async deleteAccount (req, reply)
    {
        const result = await this.userService.deleteAccount (req.params);
        reply.send (result);
    }
}

export default UserController;