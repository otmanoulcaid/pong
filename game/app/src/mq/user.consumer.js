import { config } from '../config/env.config.js';

async function setupUserConsumers(fastify) {
    const { channel } = fastify.mq;
    const { users_db } = fastify;

    await channel.assertQueue(config.create_user_queue);
    await channel.assertQueue(config.update_username_queue);
    await channel.assertQueue(config.update_avatar_queue);

    channel.consume(config.create_user_queue, async (msg) => {
        try {
            const data = JSON.parse(msg.content.toString());
            users_db.createUser(data.username, data.avatar_url);
            channel.ack(msg);
        }
        catch (err) {}
    });
    
    channel.consume(config.update_avatar_queue, async (msg) => {
        try {
            const data = JSON.parse(msg.content.toString());
            users_db.setAvatarurl(data.username, data.avatar_url);
            channel.ack(msg);
        }
        catch (err) {}
    });

    channel.consume(config.update_username_queue, async (msg) => {
        try {
            const data = JSON.parse(msg.content.toString());
            users_db.setUsername(data.username, data.newusername);
            channel.ack(msg);
        }

        catch (err) {}
    });

}

export default setupUserConsumers;