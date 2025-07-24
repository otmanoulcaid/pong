import gameRoute from './game.route.js';

export default (fastify) =>
{
    fastify.register (gameRoute);
}
