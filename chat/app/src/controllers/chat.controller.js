export class ChatController
{
    constructor(fastify, chatService, friendService)
    {
        this.connections = new Map();
        this.fastify = fastify;
        this.chatService = chatService;
        this.friendService = friendService;
    }

    manageConnection(socket, request)
    {
        const connectedUser = request.headers['x-auth-user'];
        if (!connectedUser)
            return;
        socket.username = connectedUser;
        this.connections.set(connectedUser, socket);``
        socket.on('message', (msg) => this.#messageHandler(JSON.parse(msg), connectedUser));
        socket.on('close', () => this.connections.delete(connectedUser));
        socket.on('error', (err) => console.log(err) );
    }

    async #messageHandler(message, connectedUser)
    {
        switch (message.event?.toUpperCase()) {

            case "REQUESTUSER":
                this.#sendAllMessages(socket, connectedUser, message.content);
                break;

            case "REQUESTUNREAD":
                this.#deliverUnreadMessages(socket, connectedUser);
                break;

            case "NEWMESSAGE":
                this.#processMessage(this.connections, connectedUser, message.content);
                break;
        }
    }

    #sendAllMessages(socket, connectedUser, content)
    {
        //add input validation
        this.chatService.sendAllMessages(socket, connectedUser, content);
    }

    #deliverUnreadMessages(socket, connectedUser)
    {
        //add input validation
        this.chatService.deliverUnreadMessages(socket, connectedUser);
    }

    #processMessage(connections, connectedUser, content)
    {
        //add input validation`
        this.chatService.processMessage(this.connections, connectedUser, content);
    }
}
