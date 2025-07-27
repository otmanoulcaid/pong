const config = 
{

    host: process.env.HOST || '0.0.0.0',
    port : process.env.PORT || 3003,

    servers: {
        rabbitmq : process.env.RABBITMQ_HOST || 'amqp://localhost',
    }
}

export {config};