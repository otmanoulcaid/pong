import fp from 'fastify-plugin';
import dbplugin from './sqlite-db.plugins.js'
import redisPlugin from './redis.plugin.js';
import cors from '@fastify/cors';
import amqpPlugin from './amqp.plugin.js';
import fastifyWebsocket from '@fastify/websocket';
export default fp 
(
    async function registerPlugins (fastify)
    {
        fastify.addHook('onRequest', async (req, res) => {
            console.log('>>>> from Game <<<< URI : ' + req.url);
        })
        await fastify.register(cors);
		await fastify.register(fastifyWebsocket);
        await fastify.register (dbplugin);
        await fastify.register (redisPlugin);
        await fastify.register (amqpPlugin);

    }
)