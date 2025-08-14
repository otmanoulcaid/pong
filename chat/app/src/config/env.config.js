const config = 
{

    host: process.env.HOST || '0.0.0.0',
    port : process.env.PORT || 3003,
    db: process.env.DB_PATH || '/app/src/data/chat.sqlite',
    
    friend_queue: process.env.FRIEND_QUEUE,
    notification_queue: process.env.NOTIF_QUEUE,

    servers: {
        rabbitmq : process.env.RABBITMQ_HOST || 'amqp://localhost',
        friend : process.env.FRIEND_HOST || 'http://localhost:3006',
    }
}

export {config};