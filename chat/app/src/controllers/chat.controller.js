export class ChatController
{
    constructor(chatService, friendService)
    {
        this.connections = new Map()
        this.chatService = chatService;
        this.friendService = friendService;
    }

    manageConnection(socket, request)
    {
        if (!this.connections[request.params.username])
        {
            socket.username = request.params.username
            this.connections[socket.username] = socket
        }
        const messages = this.chatService.getNoneReadMessages(socket.username);
        if (messages.length)
        {
            socket.send(JSON.stringify(messages));
            this.chatService.changeMessageStat(socket.username)   
        }
        socket.on('message', this.#messageHandler.bind(this))
        socket.on('close', () => {
            this.connections.delete(socket.username)
        })
        socket.on('error', (err) => {
            console.log(err);
        })
    }

    #messageHandler(message)
    {
        message = JSON.parse(message)
        if (this.friendService.isBlocked(message.from, message.to))
            return;
        const delivredMessage = {
            u_from: message.from,
            u_to: message.to,
            content: message.content,
        }
        if (this.connections[message.to])
        {
            this.connections[message.to].send(JSON.stringify(delivredMessage))
            delivredMessage.stat = 'd'
        }
        this.chatService.insertMessage(delivredMessage)
    }
}
