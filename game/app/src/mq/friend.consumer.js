import { config } from "../config/env.config.js";

async function friendConsumer(fastify) 
{
    const { channel } = fastify.mq;
    const { friendRepo } = fastify;

    await channel.assertQueue(config.friend_queue);
    channel.consume(config.friend_queue, async (msg) => {
        try {
            const data = JSON.parse(msg.content.toString());
            console.log ("=================print messsage consumer game=========================");
            console.log (data);
            console.log ("=================print messsage consumer game=========================");
            if (data.type === 'CREATE_FRIEND')
                friendRepo.insertFriendship(data.u_from, data.u_to);
            else if (data.type === 'DELETE_FRIEND')
                friendRepo.delete(data.u_from, data.u_to);
            console.log ("=================does he acknowledge=========================");
            channel.ack(msg);
        }
        catch (err) {}
    });
}

export default friendConsumer;