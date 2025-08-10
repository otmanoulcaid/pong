import Fastify from "fastify";
import registerPlugins from "./plugins/regester.plugins.js";
import printRoutes from "fastify-print-routes";
import { wsGameRoutes } from "./routes/ws.game.route.js";
import { restGameRoutres } from "./routes/game.route.js";
import { config } from "./config/env.config.js";
import cors from "@fastify/cors";

export class Server {
	constructor() {
		this.server = Fastify();
		this.config();
	}

	config() {
		this.server.register(cors, {
			origin: "http://localhost:3000",
			credentials: true,
			methods: ['PUT', 'POST', 'GET', 'DELETE']
		});
		this.server.register(printRoutes);
		this.server.register(registerPlugins);
		this.server.register(restGameRoutres, { prefix: "/api/v1/game" });
		this.server.register(wsGameRoutes, { prefix: "/ws/v1/game" });
	}

	start()
	{
		this.server.listen({
			port: config.port,
			host: config.host,
		})
		.then(address => console.log(`game server is running on ${address}...`))
		.catch(err => {
			console.error(err);
			process.exit(1);
		})
	}
}
