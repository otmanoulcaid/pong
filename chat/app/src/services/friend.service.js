export class FriendService
{
    constructor(fastify, friendRepository, userService)
    {
        this.fastify = fastify
        this.friendRepository = friendRepository
    }

    getAll(from)
    {
        return this.friendRepository.findAllFriends(from);
    }

    async getUserByUsername(username)
    {
        return await this.friendRepository.getUserByUsername(username);
    }

    isBlocked(from, to)
    {
        const friendship = this.friendRepository.findFriendShip(from, to)
        return friendship.length === 0;
    }
}
