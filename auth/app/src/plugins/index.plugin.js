import fp from 'fastify-plugin'

export default fp(async (fastify) =>
{
    fastify.register(await import('./jwt.plugin.js'))
    fastify.register(await import('./mailer.plugin.js'))
    fastify.register(await import('./google-auth.plugin.js'))
    fastify.register(await import('./redis.plugin.js'))
});
