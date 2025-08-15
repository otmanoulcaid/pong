import { friendPublisher } from "../mq/friend.publisher.js";
import { notificationPublisher } from "../mq/notification.publisher.js";
import AppError from "../utils/AppError.js";
export class FriendService
{
    constructor(fastify, friendRepository, userService)
    {
        this.fastify = fastify
        this.friendRepository = friendRepository
        this.userService = userService
    }

    getAllFriends(from)
    {
        return this.friendRepository.findAllFriends(from);
    }

    getFriendship({ from, to })
    {
        return this.friendRepository.findOne(from, to);
    }

    check({ from, to })
    {
        const friend = this.friendRepository.findOne(from, to);
        console.log(friend);
        return { success: friend.length != 0 && friend[0]?.stat === 'accepted' }
    }

    async addFriend(friend)
    {
        const friendship = this.friendRepository.findOne(friend.u_from, friend.u_to)[0]
        if (friendship) {
            if (friendship.stat == 'pending')
                throw new AppError(`you alreay add this user`, 400);
            if (friendship.stat == 'accepted')
                throw new AppError(`you are already friends`, 400);
            if (friendship.stat == 'blocked')
                throw new AppError(`this user blocked you`, 400);
        }
        friend.stat = 'pending';
        this.friendRepository.insert(friend)
        console.log(friend);
        const userFrom = this.userService.getUserByUsername(friend.u_from);
        const userTo = this.userService.getUserByUsername(friend.u_to)
        console.log(userFrom);
        console.log(userTo);
        await notificationPublisher (this.fastify, {
            service: 'friend',
            content : {
                event: 'REQUEST',
                sender: userFrom?.username,
                receiver: userTo?.username,
                senderAvatarUrl: userFrom?.avatar_url,
                date: new Date().toISOString()
            }
        });
    }

    async acceptFriend(friend)
    {
        const userFrom = this.userService.getUserByUsername(friend.u_from);
        const userTo = this.userService.getUserByUsername(friend.u_to);
        const friendship = this.friendRepository.findOne(friend.u_from, friend.u_to)[0]
        if (!friendship)
            throw new AppError(`that user did not send to you a friend request`, 400);
        if (friendship.stat == 'blocked')
            throw new AppError(`this user blocked you`, 400);
        if (friendship.stat == 'accepted')
            throw new AppError(`you are already friends`, 400);
        friend.stat = 'accepted'
        this.friendRepository.update(friend);
        await notificationPublisher (this.fastify, {
            service: 'friend',
            content : {
                event: 'ACCEPT',
                sender: userFrom.username,
                receiver: userTo.username,
                senderAvatarUrl: userFrom.avatar_url,
                date: new Date().toISOString()
            }
        });
        await friendPublisher (this.fastify, {
            type : 'CREATE_FRIEND',
            u_from: userFrom.username,
            u_to: userTo.username,
        });
    }

    async blockFriend(friend)
    {
        const friendship = this.friendRepository.findOne(friend.u_from, friend.u_to)[0]
        if (!friendship)
            throw new AppError(`you are not friends`, 400);
        if (friendship.stat === 'blocked')
            throw new AppError(`you already block this friend`, 400);
        friend.stat = 'blocked'
        this.friendRepository.update(friend);
        const userTo = this.userService.getUserByUsername(friend.u_to);
        const userFrom = this.userService.getUserByUsername(friend.u_from)
        await friendPublisher (this.fastify, {
            type : 'DELETE_FRIEND',
            u_from: userFrom.username,
            u_to: userTo.username,
        });
    }

    async removeFriend(friend)
    {
        const friendship = this.friendRepository.findOne(friend.u_from, friend.u_to)[0]
        console.log(friendship);
        if (!friendship)
            throw new AppError(`you are not friends`, 400);
        if (friendship.stat === 'blocked')
            throw new AppError(`you can not remove blocked friend`, 400);
        this.friendRepository.delete(friend.u_from, friend.u_to)
        const userTo = this.userService.getUserByUsername(friend.u_to);
        const userFrom = this.userService.getUserByUsername(friend.u_from)
        await friendPublisher (this.fastify, {
            type : 'DELETE_FRIEND',
            u_from: userFrom.username,
            u_to: userTo.username,
        });
    }
}
