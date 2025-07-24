import userRoute from './user.route.js';

export default (fastify) =>
{
    fastify.register (userRoute, { prefix: '/api/v1' });
}
