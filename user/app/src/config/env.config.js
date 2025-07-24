
// import doenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// const __filename = fileURLToPath (import.meta.url);
// const __dirname = dirname(__filename);
// doenv.config ({path : join( __dirname, '..', '..', '.env')});

const config = {
	host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT_USER || 3002,
    db_path : process.env.DB_PATH,

    cloudinary_name : process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_key : process.env.CLOUDINARY_API_KEY,
    cloudinary_secret : process.env.CLOUDINARY_API_SECRET,
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