export class FriendService
{
    constructor(friendRepository)
    {
        this.friendRepository = friendRepository
    }

    getAll(from)
    {
        return this.friendRepository.findAll(from);
    }

    addFriend(friend)
    {
        friend.stat = 'pending';
        this.friendRepository.insert(friend)
    }

    acceptFriend(friend)
    {
        friend.stat = 'accepted'
        this.friendRepository.update(friend);
    }
    
    blockFriend(friend)
    {
        friend.stat = 'blocked'
        this.friendRepository.update(friend);
    }

    removeFriend(friend)
    {
        this.friendRepository.delete(friend.u_from, friend.u_to)
    }

    isBlocked(from, to)
    {
        const friend = this.friendRepository.findOne(from, to)
        return friend && friend.stat === 'blocked'
    }
}
