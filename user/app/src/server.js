import Fastify from 'fastify'
import registerPlugins from './plugins/regester.plugins.js';
import registerRoutes from './routes/regester.routes.js';
import printRoutes from 'fastify-print-routes';
import dotenv from 'dotenv'

const fastify = Fastify({ logger: true });

fastify.register(printRoutes);
await fastify.register(registerPlugins);
await fastify.register(registerRoutes);

export default fastify;