async function setupUserConsumers(fastify) {
    const channel = fastify?.mq?.channel;
    const { users_repo } = fastify;

        await channel?.assertExchange('user.events', 'fanout',{durable: false});
        const q =  await channel?.assertQueue('', { exclusive: true });
        await channel?.bindQueue(q.queue, 'user.events', '');
        channel?.consume(q.queue, async (msg) => 
        {
            try 
            {
                const data = JSON.parse(msg.content.toString());
                if (data.type === 'CREATE_USER')
                    users_repo.createUser(data.username, data.avatar_url);
                else if (data.type === 'UPDATE_USERNAME')
                    users_repo.updateUsername(data.username, data.newusername);
                else if (data.type === 'UPDATE_AVATAR')
                    users_repo.updateAvatarurl(data.username, data.avatar_url);
                channel?.ack(msg);
            }
            catch (err) {}
        });
}

export default setupUserConsumers;