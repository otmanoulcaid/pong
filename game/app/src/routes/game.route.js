import GameController from '../controllers/game.controller.js';


export default async (fastify, opts) => {
    const gameController = new GameController(fastify.gameService);

    fastify.get('/api/v1/game/pong/history/:username', gameController.getHistoryUserPong.bind(gameController));
    fastify.get('/api/v1/game/pong/summary/:username', gameController.getUserPongSummary.bind(gameController));
    fastify.get('/api/v1/game/pong/leaderboard', gameController.getLeaderBoardPong.bind(gameController));

    fastify.get('/api/v1/game/doom/history/:username', gameController.getHistoryUserDoom.bind(gameController));
    fastify.get('/api/v1/game/doom/summary/:username', gameController.getUserDoomSummary.bind(gameController));
    fastify.get('/api/v1/game/doom/leaderboard', gameController.getLeaderBoardDoom.bind(gameController));

    fastify.get('/api/v1/game/tournament/history', gameController.getTournamentsHistory.bind(gameController));
    fastify.get('/api/v1/game/tournament/:name', gameController.getTournamentsStats.bind(gameController));

    fastify.get('/game/ws', { websocket: true }, gameController.game_socket.bind(gameController));
    fastify.get('/api/v1/game/ping', gameController.pong.bind(gameController));
}

