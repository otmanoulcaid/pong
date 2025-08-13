import fp from 'fastify-plugin'
import db from './database.plugin.js'
import mq from './amqp.plugin.js'
import setupUserConsumers from '../mq/user.consumer.js';
import publisherPlugin from './publisher.plugin.js';

export default fp(async (fastify) =>{
    await fastify.register(db);
    await fastify.register(mq);
    await fastify.register(publisherPlugin);
    await setupUserConsumers(fastify);
})