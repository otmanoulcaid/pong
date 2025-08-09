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

    getAll(from)
    {
        return this.friendRepository.findAllFriends(from);
    }

    async addFriend(friend)
    {
        const friendship = this.friendRepository.findOne(friend.u_from, friend.u_to)
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
        const userFrom = this.userService.getUserByUsername(friend.u_from);
        const userTo = this.userService.getUserByUsername(friend.u_to)
        await notificationPublisher (this.fastify, {
            service: 'friend',
            content : {
                event: 'request',
                sender: userFrom.username,
                reciever: userTo.username,
                senderAvatarUrl: userFrom.avatar_url,
                date: new Date().toISOString()
            }
        });
    }

    async acceptFriend(friend)
    {
        const userFrom = this.userService.getUserByUsername(friend.u_from);
        const userTo = this.userService.getUserByUsername(friend.u_to);
        const friendship = this.friendRepository.findOne(friend.u_from, friend.u_to)
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
                event: 'accept',
                sender: userFrom.username,
                reciever: userTo.username,
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
        const friendship = this.friendRepository.findOne(friend.u_from, friend.u_to)
        if (!friendship)
            throw new AppError(`you are not friends`, 400);
        this.friendRepository.delete(friend.u_from, friend.u_to)
        const userTo = this.userService.getUserByUsername(friend.u_to);
        const userFrom = this.userService.getUserByUsername(friend.u_from)
        await friendPublisher (this.fastify, {
            type : 'DELETE_FRIEND',
            u_from: userFrom.username,
            u_to: userTo.username,
        });
    }

    isBlocked(from, to)
    {
        const friend = this.friendRepository.findOne(from, to)
        return friend && friend.stat === 'blocked'
    }

    getRangeOfFriends(username, conUsernames)
    {
        const allFriends = this.friendRepository.findAllFriends(username);

        console.log(allFriends);
    
        return allFriends.filter(friend =>
            conUsernames.some(conUsername => friend.username == conUsername)
        );
    }
}
