export class ChatService
{
    constructor(fastify, chatRepository, friendService)
    {
        this.fastify = fastify
        this.chatRepository = chatRepository
        this.friendService = friendService;
    }

    async #sendNotification(content)
    {
        const user = await this.friendService.getUserByUsername(content.sender);
        content.avatar_url = user.avatar_url;
        const notification = {
            service: 'chat',
            content
        }
        await this.fastify.publishInNotifQueue(notification);
    }

    changeMessageStat(user)
    {
        this.chatRepository.update(user, { stat: 'd' })
    }

    async isBlocked(from, to)
    {
        return await this.friendService.isBlocked(from, to);
    }

    async processMessage(connections, from, message)
    {
        const keys = Object.keys(message);
        if (keys.length != 2 || !keys.some(key => key == 'message') || !keys.some(key => key == 'to'))
            return;
        if (await this.isBlocked(from, message.to))
            return;

        const delivredMessage = {
			event: "CHAT",
            sender: from,
            reciever: message.to,
            content: message.message,
            date: new Date().toISOString()
        }

        if (connections.has(message.to)) {
            connections.get(message.to).send(
                JSON.stringify({
                    to: delivredMessage.sender,
                    message: delivredMessage.content
                })
            )
            delivredMessage.stat = 'd'
        }
        else
            await this.#sendNotification({...delivredMessage});

        this.chatRepository.insertMessage({...message, from, date: delivredMessage.date});
    }

    async deliverUnreadMessages(socket, connectedUser)
    {
        const messages = this.chatRepository.findNoneReadMessages(connectedUser);
        for (let i = 0; i < messages.length; i++) {
            messages[i].avatar = await this.friendService.getUserByUsername(messages[i].sender)?.avatar_url;
            messages[i].lastMessage = this.chatRepository.findLastMessage(connectedUser);
        }
        socket.send(
            JSON.stringify({
                event: 'UNREAD',
                content: messages
            })
        );
        this.changeMessageStat(connectedUser);
    }
    
    async sendAllMessages(socket, connectedUser, requestMessages)
    {
        const messages = this.chatRepository.findAll(connectedUser, requestMessages.user);
        if (messages.length) {
            const sender_avatar = await this.friendService.getUserByUsername(messages[0].sender)?.avatar_url;
            const reciever_avatar = await this.friendService.getUserByUsername(messages[0].reciever)?.avatar_url;
            for (let i = 0; i < messages.length; i++)
                messages[i].avatar = (messages[i].sender = connectedUser) ? sender_avatar : reciever_avatar
        }
        socket.send(
            JSON.stringify({
                event: 'USER',
                content: messages
            })
        );
    }
}
