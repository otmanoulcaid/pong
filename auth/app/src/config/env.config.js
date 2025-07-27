export const config = {

    port: process.env.PORT || 3001,
    host: process.env.HOST || '0.0.0.0',

    jwt_secret : process.env.JWT_SECRET || 'NO_SECRET_IN_DEV',

    redirect_uri : process.env.REDIRECT_URI,
    client_id : process.env.CLIENT_ID,
    client_secret : process.env.CLIENT_SECRET,

    email_user : process.env.EMAIL_USER,
    email_password : process.env.EMAIL_PASS ,
    email_host : process.env.EMAIL_HOST,

    servers: {
        redis : process.env.REDIS_HOST || 'redis://localhost',
        user : process.env.USER_HOST || 'http://localhost:3002',
    },
}
