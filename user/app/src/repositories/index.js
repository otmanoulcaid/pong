import fp from 'fastify-plugin';
import ORM from './orm.js';
import { UserRepository } from './UserRepository.js';
import { FriendRepository } from './FriendRepository.js';
import { GameRepository } from './GameRepository.js';
import { PlayerRepository } from './PlayerRepository.js';
import { TournamentRepository } from './TournamentRepository.js';


export default fp(async (fastify) => {
    fastify.addHook('onClose', () => {
        ORM.close();
    });
    const orm = await ORM.getORMInstance();
    fastify.decorate('UserRepository', new UserRepository(orm));
    fastify.decorate('friendRepository', new FriendRepository(orm));
    fastify.decorate('gameRepository', new GameRepository(orm));
    fastify.decorate('playerRepository', new PlayerRepository(orm));
    fastify.decorate('tournamentRepository', new TournamentRepository(orm));
});
