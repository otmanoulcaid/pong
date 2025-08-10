import Fastify from "fastify";
import plugins from "./plugins/index.plugin.js";
import { routes } from "./routes/index.route.js";
import { config } from "./config/env.config.js";
import printRoutes from "fastify-print-routes";

export class Server {
	constructor() {
		this.server = Fastify();
		this.config();
	}

	config() {
		this.server.setErrorHandler((error, request, reply) => {
            if (error.validation) {
                const message = error.validation[0].message;
        
                return reply.status(400).send({
                    statusCode: 400,
                    error: "Bad Request",
                    message,
                });
            }
            reply.send(error);
        });
		this.server.register(printRoutes);
		this.server.register(plugins);
		this.server.register(routes, { prefix: "/api/v1/auth" });
	}

	start()
	{
		this.server.listen({
			port: config.port,
			host: config.host,
		})
		.then(address => console.log(`auth server is running on ${address}...`))
		.catch(err => {
			console.error(err);
			process.exit(1);
		})
	}
}
