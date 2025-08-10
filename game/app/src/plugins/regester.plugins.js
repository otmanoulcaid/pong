import fp from 'fastify-plugin';
import dbplugin from './sqlite-db.plugins.js';
import fastifyWebsocket from '@fastify/websocket';
import redisPlugin from './redis.plugin.js';
import amqpPlugin from './amqp.plugin.js';
import userConsumers from '../mq/user.consumer.js';
import friendConsumer from '../mq/friend.consumer.js';
import publisherPlugin from './publisher.plugin.js';

export default fp(async function registerPlugins(fastify) {
	await fastify.register(fastifyWebsocket);
	await fastify.register(amqpPlugin);
	await fastify.register(publisherPlugin);
	await fastify.register(dbplugin);
	await fastify.register(redisPlugin);
	await userConsumers(fastify);
	await friendConsumer(fastify);
});
