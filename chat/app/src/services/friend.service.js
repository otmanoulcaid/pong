export class FriendService
{
    constructor(friendRepository)
    {
        this.friendRepository = friendRepository
    }

    getAll(from)
    {
        return this.friendRepository.findAll();
    }

    addFriend(friend)
    {
        this.friendRepository.insert(friend)
    }

    acceptFriend(friend)
    {
        this.friendRepository.update(friend.from, friend.to, 'accepted');
    }

    blockFriend(friend)
    {
        this.friendRepository.update(friend.from, friend.to, 'blocked');
    }

    removeFriend(friend)
    {
        this.friendRepository.delete(friend.from, friend.to)
    }

    isBlocked(from, to)
    {
        const friend = this.friendRepository.findOne(from, to)
        return friend && friend.stat === 'blocked'
    }
}
