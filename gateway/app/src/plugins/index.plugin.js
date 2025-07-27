import fp from 'fastify-plugin'

export default fp( async (fastify) => {
    fastify.register(await import('./rabbitmq.plugin.js'));
    fastify.register(await import('./auth.plugin.js'));
    fastify.register(await import('./internal-token.plugin.js'));
    fastify.register(await import('@fastify/reply-from'));
});
