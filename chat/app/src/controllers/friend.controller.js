export class FriendController
{
    constructor(friendService)
    {
        this.friendService = friendService
    }

    getAllFriends(request, reply)
    {
        // const from = request.user.username // until we integrate the auth service
        const from = request.params.username;
        const friends = this.friendService.getAll(from);
        reply.send({ friends })
    }

    async acceptFriend(request, reply)
    {
        const { from, to } = request.body
        await this.friendService.acceptFriend({
            u_from: from,
            u_to: to
        })
        reply.send({ message: 'accepted successfully' })
    }
    
    async blockFriend(request, reply)
    {
        const { from, to } = request.body
        await this.friendService.blockFriend({
            u_from: from,
            u_to: to
        })
        reply.send({ message: 'blocked successfully' })
    }
    
    async addFriend(request, reply)
    {
        const { from, to } = request.body
        await this.friendService.addFriend({
            u_from: from,
            u_to: to
        })
        reply.send({ message: 'added successfully' })
    }
    
    async removeFriend(request, reply)
    {
        const { from, to } = request.body
        await this.friendService.removeFriend({
            u_from: from,
            u_to: to
        })
        reply.send({ message: 'removed successfully' })
    }
}
