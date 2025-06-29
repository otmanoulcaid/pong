class FriendService
{
    constructor(friendRepository)
    {
        this.friendRepository = friendRepository;
    }

    async getFriends( uid )
    {
        try {
            const friends = await this.friendRepository.selectAllfriends(uid)
            return { stat : true, friends }
        } catch (error) {
            error.stat = false;
            return error;
        }
    }

    async addFriend( friendship )
    {
        try {
            await this.friendRepository.insertFriendship(friendship);
            return { stat: true }
        } catch (error) {
            error.stat = false;
            return error;
        }
    }

    async acceptFriend( friendship )
    {
        try {
            await this.friendRepository.updateFriendship('accepted', friendship);
            return { stat: true }
        } catch (error) {
            error.stat = false;
            return error;
        }
    }

    async removeFriend( friendship )
    {
        try {
            this.friendRepository.deleteFriendship(friendship);
            return { stat: true };
        } catch (error) {
            error.stat = false;
            return error;
        }
    }

    async blockFriend( friendship )
    {
        try {
            await this.friendRepository.updateFriendship('blocked', friendship); 
            return { stat: true }
        } catch (error) {
            error.stat = false;
            return error;
        }
    }
}

export { FriendService };
