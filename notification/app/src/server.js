import Fastify from 'fastify'
import plugins from './plugins/index.plugin.js'
import { config } from './config/env.config.js';


export class Server
{
    constructor()
    {
        this.server = Fastify();
        this.config();
    }
    
    config()
    {
        this.server.register(plugins);
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
                console.log(`notification server is running on port ${config.port}...`);
            }
        );
    }
}
