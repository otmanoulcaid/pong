import fp from 'fastify-plugin'
import mq from './amqp.plugin.js'
import consumeEmail from '../jobs/consumer.job.js'
import mailerPlugin from './mailer.plugin.js'

export default fp(async (fastify) => {
    await fastify.register(mailerPlugin)
    await fastify.register(mq)
    await consumeEmail(fastify);
})
