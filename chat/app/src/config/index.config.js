export const config = {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT_CHAT || 3003,
    JWT_SECRET : process.env.JWT_SECRET || 'no_secret_for_dev',
    servers :
    {
        RABBITMQ : process.env.RABBITMQ_HOST || 'amqp://localhost',
        REDIS : process.env.REDIS_HOST || 'redis://localhost',
        GATEWAY : process.env.GATEWAY_HOST || 'http://localhost:3000',
        GAME : process.env.GAME_HOST || 'http://localhost:3004',
        AUTH : process.env.AUTH_HOST || 'http://localhost:3001',
        CHAT : process.env.CHAT_HOST || 'http://localhost:3003',
        USER : process.env.USER_HOST || 'http://localhost:3002',
    },
}