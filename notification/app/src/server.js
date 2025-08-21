import Fastify from 'fastify'
import printRoutes from "fastify-print-routes";
import plugins from './plugins/index.plugin.js'
import { config } from './config/env.config.js';
import { routes } from './routes/notification.route.js';
import fastifyMetrix from 'fastify-metrics';


export class Server
{
    constructor()
    {
        this.server = Fastify({ exposeHeadRoutes: false });
        this.config();
    }
    
    config()
    {
        this.server.register (fastifyMetrix, 
        {
            endpoint : '/metrics'
        });
        this.server.register(plugins);
        this.server.register(printRoutes);
        this.server.register(routes, { prefix: '/ws/v1/notification' });
    }

    start()
    {
        this.server.listen({
            port: config.port,
            host: config.host,
        })
        .then(address => console.log(`notification server is running on ${address}...`))
        .catch(err => {
            console.error(err);
            process.exit(1);
        })
    }
}
