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

    acceptFriend(request, reply)
    {
        request.body = JSON.parse(request.body)
        const {from, to} = request.body
        this.friendService.acceptFriend({
            u_from: from,
            u_to: to
        })
        reply.send({ message: 'accepted successfully' })
    }
    
    blockFriend(request, reply)
    {
        request.body = JSON.parse(request.body)
        const {from, to} = request.body
        this.friendService.blockFriend({
            u_from: from,
            u_to: to
        })
        reply.send({ message: 'blocked successfully' })
    }
    
    addFriend(request, reply)
    {
        request.body = JSON.parse(request.body)
        const {from, to} = request.body
        this.friendService.addFriend({
            u_from: from,
            u_to: to
        })
        reply.send({ message: 'added successfully' })
    }
    
    removeFriend(request, reply)
    {
        request.body = JSON.parse(request.body)
        const {from, to} = request.body
        this.friendService.removeFriend({
            u_from: from,
            u_to: to
        })
        reply.send({ message: 'removed successfully' })
    }
}
