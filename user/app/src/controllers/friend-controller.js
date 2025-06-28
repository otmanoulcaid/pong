export const getFriends = async (request, reply) =>
{
    const uid = request.params.uid;
    let response = await request.fastify.friendService.getFriends( uid )
    if (response.stat)
        return reply.code(201).send(response.friends);
    return reply.code(400).send({ error: response.message });
}

export const addFriend = async (request, reply) =>
{
    const { u_from, u_to } = request.body;
    let response = await request.fastify.friendService.addFriend({ u_from, u_to })
    if (response.stat)
        return reply.code(201).send("ok");
    return reply.code(400).send({ error: response.message });
}

export const acceptFriend = async (request, reply) =>
{
    const { u_from, u_to } = request.body;
    let response = await request.fastify.friendService.acceptFriend({ u_from, u_to })
    if (response.stat)
        return reply.code(201).send("ok");
    return reply.code(400).send({ error: response.message });
}

export const removeFriend = async (request, reply) =>
{
    const { u_from, u_to } = request.body;
    let response = await request.fastify.friendService.removeFriend({ u_from, u_to })
    if (response.stat)
        return reply.code(201).send("ok");
    return reply.code(400).send({ error: response.message });
}

export const blockFriend = async (request, reply) =>
{
    const { u_from, u_to } = request.body;
    let response = await request.fastify.friendService.blockFriend({ u_from, u_to })
    if (response.stat)
        return reply.code(201).send("ok");
    return reply.code(400).send({ error: response.message });
}
