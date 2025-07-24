import Fastify from 'fastify'
import plugins from './plugins/index.plugin.js'
import { friend } from './routes/friend.route.js'
import { chat } from './routes/chat.route.js'
import fastifyWebsocket from "@fastify/websocket";
import { config } from './config/index.config.js';
import printRoutes from 'fastify-print-routes';

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
        this.server.register(fastifyWebsocket);
        this.server.register(friend, { prefix: '/api/v1/friends' });
        this.server.register(chat, { prefix: '/ws' });
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
                console.log(`fastify server is running on port ${config.port}...`);
            }
        );
    }
}
