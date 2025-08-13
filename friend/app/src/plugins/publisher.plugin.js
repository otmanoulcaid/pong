import { config } from "../config/env.config.js";
import fp from 'fastify-plugin'

export default fp(async (fastify) => {
    fastify.decorate('publishInNotifQueue', async (data) => {
        console.log('================== publisher plugin chat service ==================');
        console.log(data);
        console.log('================== publisher plugin chat service ==================');
        await fastify.mq.channel.assertQueue(config.notification_queue);
        await fastify.mq.channel.sendToQueue(
            config.notification_queue,
            Buffer.from(Buffer.from(JSON.stringify(data)))
        )
    })
})
