export const getFriends = async (request, reply) =>
{
    const uid = request.params.uid;
    let response = await request.fastify.friendService.getFriends( uid )
    if (response.stat)
        return reply.code(201)
    return reply.code(400).send({ error: response.message });
}

export const addFriend = async (request, reply) =>
{
    const { from, to } = request.body;
    let response = await request.fastify.friendService.addFriend({ from, to })
    if (response.stat)
        return reply.code(201)
    return reply.code(400).send({ error: response.message });
}

export const acceptFriend = async (request, reply) =>
{
    const { from, to } = request.body;
    let response = await request.fastify.friendService.acceptFriend({ from, to })
    if (response.stat)
        return reply.code(201)
    return reply.code(400).send({ error: response.message });
}

export const removeFriend = async (request, reply) =>
{
    const { from, to } = request.body;
    let response = await request.fastify.friendService.removeFriend({ from, to })
    if (response.stat)
        return reply.code(201)
    return reply.code(400).send({ error: response.message });
}

export const blockFriend = async (request, reply) =>
{
    const { from, to } = request.body;
    let response = await request.fastify.friendService.blockFriend({ from, to })
    if (response.stat)
        return reply.code(201)
    return reply.code(400).send({ error: response.message });
}
