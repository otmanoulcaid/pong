import Fastify from 'fastify'
import registerPlugins from './plugins/regester.plugins.js';
import registerRoutes from './routes/regester.routes.js';
import setupUserConsumers from './mq/user.consumer.js';
import printRoutes from 'fastify-print-routes';

const fastify = Fastify({ logger: true });
await fastify.register(printRoutes);
await fastify.register(registerPlugins);       
await fastify.register(registerRoutes);

await setupUserConsumers (fastify);

export default fastify;