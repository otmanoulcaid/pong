async function userConsumers(fastify) 
{
    const { channel } = fastify.mq;
    const { users_db } = fastify;

    await channel.assertExchange('user.events', 'fanout',{durable: false});
    const q =  await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(q.queue, 'user.events', '');
    channel.consume(q.queue, async (msg) => 
    {
        try 
        {
            const data = JSON.parse(msg.content.toString());
            console.log ("=================print messsage consumer game=========================");
            console.log (data);
            console.log ("=================print messsage consumer game=========================");
            if (data.type === 'CREATE_USER')
                users_db.createUser(data.username, data.avatar_url);
            else if (data.type === 'UPDATE_USERNAME')
                users_db.updateUsername(data.username, data.newusername);
            else if (data.type === 'UPDATE_AVATAR')
                users_db.updateAvatarurl(data.username, data.avatar_url);
            channel.ack(msg);
        }
        catch (err) {}
    });
}

export default userConsumers;
