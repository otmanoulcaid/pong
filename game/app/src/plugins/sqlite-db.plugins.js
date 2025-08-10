import { config } from '../config/env.config.js';
import Database from 'better-sqlite3';
import fp from 'fastify-plugin';
import fs from 'fs/promises';

import UserRepo from '../repository/user.repository.js';
import GameRepo from '../repository/game.repository.js';
import PlayerRepo from '../repository/player.repository.js';
import TournamentRepo from '../repository/tournament.repository.js';
import GameService from '../services/game.service.js';
import { FriendRepository } from '../repository/friend.repositoy.js';

export default fp(async (fastify) => {

	const users = await fs.readFile(new URL('../data/users.sql', import.meta.url).pathname, 'utf-8');
	const tournaments = await fs.readFile(new URL('../data/tournaments.sql', import.meta.url).pathname, 'utf-8');
	const contestants = await fs.readFile(new URL('../data/contestants.sql', import.meta.url).pathname, 'utf-8');
	const pongs = await fs.readFile(new URL('../data/pongs.sql', import.meta.url).pathname, 'utf-8');
	const dooms = await fs.readFile(new URL('../data/dooms.sql', import.meta.url).pathname, 'utf-8');

	const db = new Database(config.db_path);

	try {
		db.exec(users);
		db.exec(tournaments);
		db.exec(pongs);
		db.exec(contestants);
		db.exec(dooms);
	} catch (err) {
		console.log(err);
	}

	db.pragma('foreign_keys = ON');
	const userRepo = new UserRepo(db);
	const gameRepo = new GameRepo(db);
	const playerRepo = new PlayerRepo(db);
	const tournamentRepo = new TournamentRepo(db);
	const friendRepository = new FriendRepository(db);

	const gameService = new GameService(fastify.publishInNotifQueue, userRepo, gameRepo, playerRepo, tournamentRepo, friendRepository);

	fastify.decorate('db', db);
	fastify.decorate('gameService', gameService);
	fastify.decorate('users_db', userRepo);
	fastify.decorate('friendRepo', friendRepository);
});
