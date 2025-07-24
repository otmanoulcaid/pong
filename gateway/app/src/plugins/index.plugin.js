import fp from 'fastify-plugin'

export default fp( async (fastify) => {
    fastify.addHook('onRequest', async (req, res) => {
        console.log('>>>> from Gateway <<<< URI : ' + req.url);
    })
    fastify.register(await import('./rabbitmq.plugin.js'));
    fastify.register(await import('./auth.plugin.js'));
    fastify.register(await import('./internal-token.plugin.js'));
    fastify.register(await import('@fastify/reply-from'));
});
