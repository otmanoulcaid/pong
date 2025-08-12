import fp from 'fastify-plugin'
import multipartPlugin from '@fastify/multipart';


export default fp( async (fastify) => {
    fastify.register (multipartPlugin, 
        {
            attachFieldsToBody: true,
            limits: {
                fileSize: 4 * 1024 * 1024,
              },
        });
    fastify.register(await import('./rabbitmq.plugin.js'));
    fastify.register(await import('./auth.plugin.js'));
    fastify.register(await import('./internal-token.plugin.js'));
    fastify.register(await import('@fastify/reply-from'));
});
