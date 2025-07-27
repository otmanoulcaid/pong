const config = {
	host: process.env.HOST || '0.0.0.0',
    port : process.env.PORT || 3002,
    db_path : process.env.DB_PATH,
    cloudinary_name : process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_key : process.env.CLOUDINARY_API_KEY,
    cloudinary_secret : process.env.CLOUDINARY_API_SECRET,

    servers: {
        rabbitmq : process.env.RABBITMQ_HOST || 'amqp://localhost',
    },
}

export {config};