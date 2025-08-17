import Fastify from "fastify";
import registerPlugins from "./plugins/regester.plugins.js";
import registerRoutes from "./routes/regester.routes.js";
import printRoutes from "fastify-print-routes";
import cors from "@fastify/cors";
import { config } from "./config/env.config.js";

export class Server {
  	constructor() {
		this.server = Fastify({ exposeHeadRoutes: false });
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
	this.server.register(registerRoutes);
  }

  start()
  {
	  this.server.listen({
		  port: config.port,
		  host: config.host,
	  })
	  .then(address => console.log(`user server is running on ${address}...`))
	  .catch(err => {
		  console.error(err);
		  process.exit(1);
	  })
  }
}
