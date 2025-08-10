import GameController from '../controllers/game.controller.js';

export const wsGameRoutes = (fastify) => {
	const gameController = new GameController(fastify.gameService);

	fastify.get('/tar', { websocket: true }, gameController.game_socket.bind(gameController));
};
