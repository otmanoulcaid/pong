import fp from 'fastify-plugin'

import pluginjwt from './jwt.plugin.js'
import oAut from './google-auth.plugin.js'
import  mqPlugin  from './amqp.plugin.js'
import redisPlugin from './redis.plugin.js'

export default fp(async (fastify) =>
{
    fastify.register(redisPlugin);
    fastify.register(oAut);
    fastify.register(pluginjwt);
    await fastify.register(mqPlugin);
});
