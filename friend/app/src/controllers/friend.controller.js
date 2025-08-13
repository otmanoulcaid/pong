export class FriendController
{
    constructor(friendService)
    {
        this.friendService = friendService
    }

    allFriends(request, reply)
    {
        const from = request.params.username;
        const friends = this.friendService.getAllFriends(from);
        reply.send({ friends })
    }

    friendship(request, reply)
    {
        const friend = this.friendService.getFriendship(request.query);
        reply.send({ friend })
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
