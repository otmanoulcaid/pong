import fp from 'fastify-plugin';
import ORM from './orm.js';
import { UserRepository } from './UserRepository.js';
import { FriendRepository } from './FriendRepository.js';


export default fp(async (fastify) => {
    fastify.addHook('onClose', () => {
        ORM.close();
    });
    const orm = await ORM.getORMInstance();
    fastify.decorate('UserRepository', new UserRepository(orm));
    fastify.decorate('friendRepository', new FriendRepository(orm));
});
