import getTemplate from "../utils/getTemplate.js";

export class NotificationController
{
    constructor(fastify, notificationService)
    {
        this.connections = new Map();
        this.fastify = fastify;
        this.notificationService = notificationService;
    }

    socketHandler(connection, request)
    {
        const username = request.headers['x-auth-user'];
		if (username)
		{
			this.#addConnection(username, connection);
			this.#fetchNotification(username);
			connection.on('message', (msg) => this.#processMesasge(msg));
			connection.on('close', () => this.#removeConnection(connection.username));
			connection.on('error', (err) => console.log(err));
		}
		else connection.close("not registered");
    }

    #processMesasge(message)
    {
        try {
            message = message.toString();
            message = JSON.parse(message);
            if (message?.id)
                this.notificationService.deleteNotification(message.id);
        } catch (error) {
            console.log(error);
        }
    }

    #addConnection(username, connection)
    {
        connection.username = username
        this.connections.set(username, connection);
    }

    #removeConnection(username)
    {
        this.connections.delete(username);
    }

    #fetchNotification(username)
    {
        let notifications = this.notificationService.getNotificationByUsername(username);
        if (notifications.length)
            this.connections.get(username)?.send(JSON.stringify(notifications))
    }

    async sendMail(notification)
    {
        const html = await getTemplate(notification.type, notification.body);
        await this.fastify.mailer.sendMail({
            to: notification.to,
            subject: notification.subject,
            html
        });
    }

    sendChat(notification)
    {
        this.notificationService.addNotification(notification)
        if (this.connections.has(notification.receiver))
            this.#fetchNotification(notification.receiver);
    }
    
    sendFriend(notification)
    {
        this.notificationService.addNotification(notification)
        if (this.connections.has(notification.receiver))
            this.#fetchNotification(notification.receiver);
    }
    
    sendGame(notification)
    {
        this.notificationService.addNotification(notification)
        if (this.connections.has(notification.receiver))
            this.#fetchNotification(notification.receiver);
    }

    sendTournament(notification)
    {
        this.notificationService.addNotification(notification)
        for (const [_, tocket] of this.connections)
            tocket.send(JSON.stringify([notification]))
    }
}
