export class FriendController
{
    constructor(friendService)
    {
        this.friendService = friendService
    }

    getAllFriends(request, reply)
    {
        const from = request.user.username
        reply.send({ friends: this.friendService.getAll(from) })
    }

    acceptFriend(request, reply)
    {
        const {from, to} = request.body
        this.friendService.acceptFriend({ from, to })
        reply.send({ message: 'accepted successfully' })
    }

    blockFriend(request, reply)
    {
        const {from, to} = request.body
        this.friendService.blockFriend({ from, to })
        reply.send({ message: 'blocked successfully' })
        
    }

    addFriend(request, reply)
    {
        const {from, to} = request.body
        this.friendService.addFriend({ from, to })
        reply.send({ message: 'added successfully' })
    }

    removeFriend(request, reply)
    {
        const {from, to} = request.body
        this.friendService.removeFriend({ from, to })
        reply.send({ message: 'removed successfully' })
    }
}
