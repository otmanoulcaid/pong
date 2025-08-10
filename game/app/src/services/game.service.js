import AppError from '../utils/AppError.js';
import * as Main from './game/index.js';

class GameService {
	constructor(publishInNotifQueue, userRepo, gameRepo, playerRepo, tournamentRepo, friendRepo) {
		this.users = userRepo;
		this.games = gameRepo;
		this.friends = friendRepo;
		this.contestants = playerRepo;
		this.tournaments = tournamentRepo;
		this.publishInNotifQueue = publishInNotifQueue;
		this.main();
	}

	main() {
		setInterval(() => {
			this.updateTournament();
			this.updateRooms();
			Main.sendGame();
			Main.sendTournament();
			Main.sendInvitations();
			Main.sendPool(this.amIAFriendOfHis.bind(this));
			Main.deleteExpiredInvitations();
		}, 1000 / 60);
	}

	amIAFriendOfHis({ username, potentialFriend }) {
		const res = this.friends.countFriendship(username, potentialFriend);
		return res.count;
	}

	async updateTournamentWinner({ tournamentName, winner }) {
		const user = this.users.findUserByUsername(winner);
		if (!user) throw new AppError('updateTournament(): this user not found', 404);
		this.tournaments.updateTournamentWinner(tournamentName, user.id);
	}

	async createGamePong({ playerUsername, opponentUsername, playerScore, opponentScore, gameDate, tournamentName }) {
		const user = this.users.findUserByUsername(playerUsername);
		const opponent = this.users.findUserByUsername(opponentUsername);
		if (!user || !opponent) throw new AppError('createGamePong(): this user not found', 404);
		const winner_id = playerScore > opponentScore ? user.id : opponent.id;
		const tournament = tournamentName ? this.tournaments.findTournamentByName(tournamentName) : undefined;
		this.games.addGamePong(user.id, opponent.id, playerScore, opponentScore, winner_id, tournament?.id, gameDate);
		return { success: true };
	}

	async createGameDoom({ playerUsername, opponentUsername, winnerUsername, gameDate }) {
		const user = this.users.findUserByUsername(playerUsername);
		const opponent = this.users.findUserByUsername(opponentUsername);
		if (!user || !opponent || (winnerUsername !== playerUsername && winnerUsername !== opponentUsername))
			throw new AppError('createGameDoom(): user not found', 404);
		const winner_id = winnerUsername === playerUsername ? user.id : opponent.id;
		this.games.addGameDoom(user.id, opponent.id, winner_id, gameDate);
		return { success: true };
	}

	async createTournament({ tournamentName, tournamentDate }) {
		this.tournaments.createTournament(tournamentName, tournamentDate);
		return { success: true };
	}

	async addPlayerToTournament({ username, tournamentName, roundLevel }) {
		const user = this.users.findUserByUsername(username);
		if (!user) throw new AppError('addPlayerToTournament(): user not found', 404);
		const tournament = this.tournaments.findTournamentByName(tournamentName);
		if (!tournament) throw new AppError('addPlayerToTournament(): tournament not found', 404);
		this.contestants.addPlayer(user.id, tournament.id, roundLevel);
		return { success: true };
	}

	async getHistoryUserPong(username) {
		const user = this.users.findUserByUsername(username);
		if (!user) throw new AppError('this user not found', 404);
		const history = this.games.getHistoryUserPong(user.id);
		return { success: true, history: history };
	}

	async getUserPongSummary(username) {
		const user = this.users.findUserByUsername(username);
		if (!user) throw new AppError('this user not found', 404);
		const stats = {
			total_games: this.games.getTotalPongGamesById(user.id),
			total_winns: this.games.getTotalWinsPongById(user.id),
			totalTournamentPlayed: this.contestants.getTotalTournamentsPlayed(user.id),
			totalTournamentWinns: this.tournaments.getTotalTournamentsWinns(user.id),
		};
		return { success: true, stats: stats };
	}

	async getUserDoomSummary(username) {
		const user = this.users.findUserByUsername(username);
		if (!user) throw new AppError('this user not found', 404);
		const stats = {
			total_games: this.games.getTotalGamesDoomById(user.id),
			total_winns: this.games.getTotalWinsDoomById(user.id),
		};
		return { success: true, stats: stats };
	}

	async getHistoryUserDoom(username) {
		const user = this.users.findUserByUsername(username);
		if (!user) throw new AppError('this user not found', 404);
		const history = this.games.getHistoryUserDoom(user.id);
		return { success: true, history: history };
	}

	async getLeaderBoardDoom(from, limit) {
		from = from || 0;
		limit = limit || -1;
		const result = this.games.getLeaderBoardDoom(from, limit);
		return { success: true, leaderboard: result };
	}

	async getLeaderBoardPong(from, limit) {
		from = from || 0;
		limit = limit || -1;
		const result = this.games.getLeaderBoardPong(from, limit);
		return { success: true, leaderboard: result };
	}

	async getTournamentsHistory() {
		const result = this.tournaments.getTournamentsHistory();
		return { success: true, history: result };
	}

	async getTournamentsStats(name) {
		const tournament = this.tournaments.findTournamentByName(name);
		if (!tournament) throw new AppError('this Tournament not found', 404);
		const user = this.users.findUserById(tournament.winner_id);
		const contestants = this.contestants.findAllContestants(tournament.id);
		const matches = this.contestants.findAllMatches(tournament.id);
		const stats = {
			Name: name,
			Date: tournament.tournament_date,
			Winner_username: user.username,
			Contestants: contestants,
			matches: matches,
		};
		return { success: true, stats: stats };
	}

	verifyUser(username, socket) {
		if (!this.users.findUserByUsername(username)) {
			socket.send(Main.ErrorMessage('You are not registered'));
			socket.close();
			return false;
		}
		if (Main.checkPlayer(username)) {
			socket.send(Main.ErrorMessage('You are aleady connected'));
			socket.close();
			return false;
		}
		Main.addPlayer(Main.createPlayer(username, socket));
		return true;
	}

	/********************************************************************************************************
	 *                                             NOTIFICATIONS                                            *
	 ********************************************************************************************************/

	createTournamentNotification() {
		const tournament = {
			tournament_name: Main.repository.tournament.name,
			tournament_date: Main.repository.tournament.due_date,
		};
		this.publishInNotifQueue({
			service: 'tournament',
			content: tournament,
		});
	}

	createInviteNotification(u_from, u_to, game) {
		const content = {
			sender: u_from,
			receiver: u_to,
			sender_avatar_url: this.users.getUserAvatar(u_to),
		};
		this.publishInNotifQueue({
			service: 'game',
			game,
			content,
		});
	}
	/********************************************************************************************************
	 *                                                 GAME                                                 *
	 ********************************************************************************************************/

	updateRooms() {
		Main.repository.rooms.forEach((room, key) => {
			if (room.game && room.game.update() && room.roomState !== 'finished') {
				room.roomState = 'finished';
				room.date_at = Date.now();
				if (room.game instanceof Main.Pong) {
					Main.registerRoomResult(room, key);
					this.createGamePong({
						playerUsername: room.player,
						opponentUsername: room.opponent,
						playerScore: room.game.playerScore,
						opponentScore: room.game.opponentScore,
						tournamentName: room.tournamentName,
						gameDate: room.date_at,
					});
				} else if (room.game instanceof Main.Doom) {
					this.createGameDoom({
						playerUsername: room.player,
						opponentUsername: room.opponent,
						winnerUsername: room.game.winner,
						gameDate: room.date_at,
					});
				}
			}
			if (room.roomState === 'connecting' && Date.now() - room.date_at > Main.RoomConnectionTimeout) Main.removeRoom(room, key);
			else if (room.roomState === 'disconnected' && Date.now() - room.date_at > Main.RoomFinishTimeout) Main.removeRoom(room, key);
			else if (room.roomState === 'finished' && Date.now() - room.date_at > Main.RoomFinishTimeout) Main.removeRoom(room, key);
		});
	}

	updateTournament() {
		switch (Main.repository.tournament.state) {
			case 'new': {
				Main.newTournament();
				this.createTournament({
					tournamentName: Main.repository.tournament.name,
					tournamentDate: Main.repository.tournament.due_date,
				});
				Main.repository.tournament.state = 'not open';
				this.createTournamentNotification();
				break;
			}
			case 'not open': {
				if (Date.now() >= Main.repository.tournament.due_date) Main.repository.tournament.state = 'open';
				break;
			}
			case 'open': {
				break;
			}
			case 'playing': {
				[...Main.repository.tournament.matches].forEach((ele) => {
					if (ele.finished) Main.repository.tournament.matches.delete(ele);
				});
				if (Main.repository.tournament.matches.size === 0) {
					const winners = [...Main.repository.tournament.registeredPlayers]
						.filter((e) => e.level === Main.repository.tournament.currentLevel)
						.sort();
					if (winners.length === 1 || winners.length === 0) Main.repository.tournament.state = 'finished';
					else {
						Main.repository.tournament.matches.clear();
						for (let i = 0; i < winners.length; i++) {
							if (i + 1 < winners.length) {
								Main.createTournamentMatch(winners[i], winners[i + 1]);
								i++;
							} else {
								Main.repository.tournament.levelup(winners[i].username);
							}
						}
						Main.repository.tournament.currentLevel += 1;
					}
				}
				break;
			}
			case 'finished': {
				let winner = '';
				let level = 0;
				for (const p of Main.repository.tournament.registeredPlayers)
					if (p.level > level) {
						level = p.level;
						winner = p.username;
					}
				for (const p of Main.repository.tournament.registeredPlayers)
					this.addPlayerToTournament({
						username: p.username,
						tournamentName: Main.repository.tournament.name,
						roundLevel: p.level,
					});
				this.updateTournamentWinner({ tournamentName: Main.repository.tournament.name, winner });
				Main.repository.tournament.state = 'new';
				break;
			}
		}
	}

	/********************************************************************************************************
	 *                                                SOCKET                                                *
	 ********************************************************************************************************/

	async closeSocket(socket) {
		if (socket.username) {
			try {
				const room = Main.getRoom(socket.gid);
				room.roomState = 'disconnected';
				room.date_at = Date.now();
			} catch (err) {
				console.error(err.message ?? 'closeSocket err');
			}
			Main.cancelAllPlayerInvitations(socket.username);
			Main.removePlayer(socket.username);
		}
	}

	async eventEntry(socket, json) {
		const { username } = socket;
		try {
			const { message, game, data } = Main.Json({ message: json, target: Main.Message.instance });
			switch (message) {
				case 'REGISTER': {
					Main.register(username, Main.Json({ message: data, target: Main.Register.instance }).alias);
					break;
				}
				case 'ENGAGE': {
					Main.connectPlayer(username, Main.Json({ message: data, target: Main.Engage.instance }).gid, game);
					break;
				}
				case 'INVITE': {
					const { recipient } = Main.Json({ message: data, target: Main.Invite.instance });
					if (this.amIAFriendOfHis({ username, potentialFriend: recipient }) === 1)
						Main.createInvitation(username, recipient, game);
					else throw new Error('his is not your friend, maybe send him an invitation first');
					this.createInviteNotification(username, recipient, game);
					break;
				}
				case 'ACCEPT': {
					Main.acceptInvitation(Main.Json({ message: data, target: Main.Invite.instance }).recipient, username);
					break;
				}
				case 'REJECT': {
					Main.declineInvitation(Main.Json({ message: data, target: Main.Invite.instance }).recipient, username);
					break;
				}
				case 'DELETE': {
					const invite = Main.Json({ message: data, target: Main.Invite.instance });
					if (invite.recipient === '*') Main.deleteAllRejectedInvitations(username);
					else Main.cancelInvitation(invite.recipient, username);
					break;
				}
				case 'HOOK': {
					Main.roomHook(username, Main.Json({ message: data, target: Main.Hook.instance }));
					break;
				}
				case 'FLIP': {
					Main.roomFlip(username, Main.Json({ message: data, target: Main.Flip.instance }));
					break;
				}
				default:
					throw new Error('UNKNOWN COMMAND');
			}
		} catch (err) {
			socket.send(Main.ErrorMessage(err?.message ?? "you didn't pong good enough"));
			console.error('Error', err.message);
		}
	}
}

export default GameService;
