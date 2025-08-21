import fp from 'fastify-plugin'
import mq from './amqp.plugin.js'
import mailerPlugin from './mailer.plugin.js'
import fastifyWebsocket from '@fastify/websocket';
import waitForQueueNotifications from './consumer.plugin.js'
import databasePlugin from './database.plugin.js';

export default fp(async (fastify) => {
    await fastify.register(fastifyWebsocket);
    await fastify.register(databasePlugin);
    await fastify.register(mailerPlugin);
    await fastify.register(mq);
    await fastify.register(waitForQueueNotifications);
})
