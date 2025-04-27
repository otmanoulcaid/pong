// @ts-nocheck

export default (fastify) => {
	fastify.get('/main', { websocket: true }, (socket, req) => {
		// fastify.gameService.addPlayer(new Player(req.is, con));
		socket.on('message', (message) => {
			console.log(message.toString());
		});
		socket.on('close', (code, reason) => {
			// fastify.gameService.removePlayer(req.id);
		});
	});

	fastify.get('/*', { websocket: true }, (socket, req) => {
		socket.on('message', (message) => {
			socket.send('hi from wildcard route');
		});
	});
};
