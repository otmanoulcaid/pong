import { Server } from './src/server.js'

function main() {
    const logger  =  {
        transport : {
            target : 'pino-pretty'
        }
    }

    new Server(logger).start()
    // new Server(false).start()
    // new Server().start()
}

main()
