
export default async (fastify) =>
{
    fastify.register(await import('./user.js'), {prefix: '/api/user'});
    fastify.register(await import('../routes/friend.js'), {prefix: '/api/friend'});
}
