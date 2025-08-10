import fp from 'fastify-plugin';

import pluginJwt from './jwt.plugin.js';
import googleAuthPlugin from './google-auth.plugin.js';
import mqPlugin from './amqp.plugin.js';
import redisPlugin from './redis.plugin.js';
import fastifyCookie from '@fastify/cookie';

export default fp(async (fastify) =>
{

    await fastify.register (fastifyCookie);

    fastify.register(redisPlugin);
    fastify.register(pluginJwt);
    fastify.register(googleAuthPlugin);
    await fastify.register(mqPlugin);
});
