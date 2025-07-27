import Fastify from 'fastify'
import plugins from './plugins/index.plugin.js'
import { routes } from './routes/index.route.js'
import printRoutes from 'fastify-print-routes';
import dotenv from 'dotenv'

export class Server
{
    constructor()
    {
        this.server = Fastify();
        this.config();
    }
    
    config()
    {
        this.server.register(printRoutes);
        this.server.register(plugins);
        this.server.register(routes, { prefix: '/api/v1' });
    }

    start()
    {
        this.server.listen(
            {
                port: process.env.PORT || 3000,
                host: process.env.HOST || '0.0.0.0',
            },
            (err) => {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                console.log(`fastify server is running on port ${3000}...`);
            }
        );
    }
}
