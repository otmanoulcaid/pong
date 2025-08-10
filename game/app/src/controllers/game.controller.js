class GameController {

	constructor(gameService) {
		this.games = gameService;
	}
    
	async getUserPongSummary(req, reply) {
        const result = await this.games.getUserPongSummary(req.params?.username);
		return reply.status(200).send(result);
	}
    
	async getHistoryUserPong(req, reply) {
        const result = await this.games.getHistoryUserPong(req.params?.username);
		return reply.status(200).send(result);
	}
    
	async getHistoryUserDoom(req, reply) {
		const result = await this.games.getHistoryUserDoom(req.params?.username);
		return reply.status(200).send(result);
	}
    
	async getUserDoomSummary(req, reply) {
        const result = await this.games.getUserDoomSummary(req.params?.username);
		return reply.status(200).send(result);
	}

    async getLeaderBoardPong(req, reply) {
        const from = req.query.from;
        const limit = req.query.limit;
        const result = await this.games.getLeaderBoardPong(from, limit);
        return reply.status(200).send(result);
    }

	async getLeaderBoardDoom(req, reply) {
        const from = req.query.from;
        const limit = req.query.limit;
		const result = await this.games.getLeaderBoardDoom(from, limit);
		return reply.status(200).send(result);
	}

	async getTournamentsHistory(req, reply) {
		const result = await this.games.getTournamentsHistory();
		return reply.status(200).send(result);
	}

	async getTournamentsStats(req, reply) {
		const result = await this.games.getTournamentsStats(req.params?.name);
		return reply.status(200).send(result);
	}

	async pong( _ , reply) {
		return reply.code(200).send({ message: 'pong' });
	}

	async game_socket(socket, req) {
		const username = req?.query?.username ?? '';
		console.log(username, ' just connected');
		if (this.games.verifyUser(username, socket)) {
			socket.on('message', (message) => this.games.eventEntry(socket, message.toString()));
			socket.on('close', () => this.games.closeSocket(socket));
			socket.on('error', () => this.games.closeSocket(socket));
		}
	}
}

export default GameController;
