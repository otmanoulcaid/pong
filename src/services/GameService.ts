// @ts-nocheck

import _ from 'lodash';

class GameService {
	players = [];
	constructor(gameDao) {
		this.gameDao = gameDao;
		this.gameLoop = this.gameLoop.bind(this);
	}
	addPlayer(add) {
		this.players.push(add);
		console.log('player added');
	}
	removePlayer(username) {
		this.players = _.remove(this.players, function (player) {
			return player.name === username;
		});
		console.log('player removed');
	}
	gameLoop() {
		this.players.forEach((player, index) => {
			player.con.send(JSON.stringify(this.players));
		});
	}
	main() {
		setInterval(this.gameLoop, 1000 / 60);
	}
}

export { GameService };
