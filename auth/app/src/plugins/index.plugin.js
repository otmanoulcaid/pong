import fp from 'fastify-plugin'

export default fp(async (fastify) =>
{
    fastify.addHook('onRequest', async (req, res) => {
        console.log('>>>> from Auth <<<< URI : ' + req.url);
    })
    fastify.register(await import('./jwt.plugin.js'))
    fastify.register(await import('./google-auth.plugin.js'))
    fastify.register(await import('./redis.plugin.js'))
});
