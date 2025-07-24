import Fastify from 'fastify'
import plugins from './plugins/index.plugin.js'
import { routes } from './routes/index.route.js'
import { config } from './config/env.config.js';
// import printRoutes from 'fastify-print-routes';

export class Server
{
    constructor()
    {
        this.server = Fastify();
        this.config();
    }

    config()
    {
        // this.server.register(printRoutes);
        this.server.register(plugins);
        this.server.register(routes, { prefix: '/api/v1/auth' });
    }

    start()
    {
        this.server.listen(
            {
                port: config.port,
                host: config.host,
            },
            (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                console.log(`fastify server is running on port ${3001}...`);
            }
        );
    }
}
