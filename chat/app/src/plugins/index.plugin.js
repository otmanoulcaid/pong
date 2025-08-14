import fp from 'fastify-plugin'
import db from './database.plugin.js'
import mq from './amqp.plugin.js'
import publisherPlugin from './publisher.plugin.js';

export default fp(async (fastify) =>{
    await fastify.register(db);
    await fastify.register(mq);
    await fastify.register(publisherPlugin);
})