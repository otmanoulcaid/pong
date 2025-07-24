import fp from 'fastify-plugin';

export default fp(async (fastify) => {
    fastify.register(await import('./database.plugin.js'));
});