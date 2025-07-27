import userRoute from './user.route.js';
import fp from 'fastify-plugin';

export default fp
(
    (fastify) =>
    {
        fastify.register (userRoute);
    }
)