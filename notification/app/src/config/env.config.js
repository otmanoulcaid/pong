const config = 
{
    host: process.env.HOST || '0.0.0.0',
    port : process.env.PORT || 3005,

    queue : process.env.EMAIL_QUEUE || 'email_queue',

    mailer: {
        email: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASS,
        host: process.env.EMAIL_HOST,
    },

    servers: {
        rabbitmq : process.env.RABBITMQ_HOST || 'amqp://localhost',
        redis : process.env.REDIS_HOST || 'redis://localhost'
    }
}

export {config};
