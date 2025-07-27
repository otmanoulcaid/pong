import fp from 'fastify-plugin';
import dbplugin from './sqlite-db.plugins.js'
import fastifyMultipart from '@fastify/multipart';
import cors from '@fastify/cors';
import amqpPlugin from './amqp.plugin.js';

export default fp 
(
    async function registerPlugins (fastify)
    {
		await fastify.register(cors);
        await fastify.register (dbplugin);
        await fastify.register (amqpPlugin);

        await fastify.register (fastifyMultipart, 
        {
            limits: { fileSize: 4_000_000 },
            attachFieldsToBody: true,
            throwFileSizeLimit: false,
        });
    }
)