export class ChatController
{
    constructor(fastify, chatService, friendService, userService)
    {
        this.connections = new Map();
        this.fastify = fastify;
        this.chatService = chatService;
        this.userService = userService;
        this.friendService = friendService;
    }

    manageConnection(socket, request)
    {
        const connectedUser = request.params.username
        this.#deliverUnreadMessages(socket, connectedUser); //protect user in case of bad request
        socket.on('message', (msg) => this.#messageHandler(JSON.parse(msg), connectedUser));
        socket.on('close', () => this.connections.delete(connectedUser));
        socket.on('error', (err) => console.log(err) );
    }

    #deliverUnreadMessages(socket, connectedUser)
    {
        socket.username = connectedUser;
        this.connections.set(connectedUser, socket);
        const messages = this.chatService.getNoneReadMessages(connectedUser);
        if (messages.length)
        {
            socket.send(JSON.stringify(messages));
            this.chatService.changeMessageStat(connectedUser);
        }
    }

    async  #messageHandler(message, connectedUser)
    {
        switch (message.event.toUpperCase())
        {
            case('MESSAGE') : {
                this.#sendMessage(message.data);
                break;
            }
            case ('ONLINE_FRIENDS') : {
                this.#getOnlineFriends(connectedUser);
                break;
            }
            default : {
                this.#unexistService();
            }
        }
    }
    
    async #sendMessage(message) {
        if (this.friendService.isBlocked(message.from, message.to))
            return;
        const delivredMessage = {
            sender: message.from,
            reciever: message.to,
            content: message.content,
        }
        if (this.connections.has(message.to))
        {
            this.connections.get(message.to).send(JSON.stringify(delivredMessage))
            delivredMessage.stat = 'd'
        }
        else 
            await this.#sendNotification({...delivredMessage});
        this.chatService.insertMessage(delivredMessage)
    }

    async #sendNotification(content)
    {
        const { avatar_url } = this.userService.getUserByUsername(content.sender);
        content.avatar_url = avatar_url;
        const notification = {
            service: 'chat',
            content
        }
        await this.fastify.publishInNotifQueue(notification)
    }

    #getOnlineFriends(connectedUser) {
        const usernames = [...this.connections.keys()].filter(u => u != connectedUser)
        let friends = this.friendService.getRangeOfFriends(connectedUser, usernames)
        this.connections.get(connectedUser).send(JSON.stringify(friends))
    }
    
    #unexistService() {
        
    }
}
