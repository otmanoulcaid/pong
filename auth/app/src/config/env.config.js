
// import doenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// const __filename = fileURLToPath (import.meta.url);
// const __dirname = dirname(__filename);
// doenv.config ({path : join( __dirname, '..', '..', '.env')});

export const config = {
    create_user_queue : process.env.CREATEUSERQUEUE,
    update_username_queue : process.env.UPDATEUSERQUEUE,
    update_avatar_queue : process.env.UPDATEAVATARQUEUE,

    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT_AUTH || 3001,

    jwt_secret : process.env.JWT_SECRET || 'NO_SECRET_IN_DEV',

    redirect_uri : process.env.REDIRECT_URI,
    client_id : process.env.CLIENT_ID,
    client_secret : process.env.CLIENT_SECRET,

    email_user : process.env.EMAIL_USER,
    email_password : process.env.EMAIL_PASS ,
    email_host : process.env.EMAIL_HOST,

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
