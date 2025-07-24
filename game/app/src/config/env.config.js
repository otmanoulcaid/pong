
// import doenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// const __filename = fileURLToPath (import.meta.url);
// const __dirname = dirname(__filename);
// doenv.config ({path : join( __dirname, '..', '..', '.env')});


const config = 
{
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT_GAME || 3004,
    db_path : process.env.DB_PATH,
    redis_url : process.env.REDIS_URL,
    create_user_queue : process.env.CREATEUSERQUEUE,
    update_username_queue : process.env.UPDATEUSERQUEUE,
    update_avatar_queue : process.env.UPDATEAVATARQUEUE,
    
    servers: {
        rabbitmq : process.env.RABBITMQ_HOST || 'amqp://localhost',
        redis : process.env.REDIS_HOST || 'redis://localhost',
        gateway : process.env.GATEWAY_HOST || 'http://localhost:3000',
        game : process.env.GAME_HOST || 'http://localhost:3001',
        auth : process.env.AUTH_HOST || 'http://localhost:3002',
        chat : process.env.CHAT_HOST || 'http://localhost:3003',
        uaer : process.env.USER_HOST || 'http://localhost:3004',
    },
}

export {config};