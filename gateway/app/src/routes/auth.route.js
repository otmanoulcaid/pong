import { config } from '../config/env.config.js';
import * as schemas from '../schemas/auth.schema.js';

export const auth = async (fastify) => {
    const forward = (request, reply) => {
        try {
            reply.from(`${config.servers.AUTH}${request.url}`, {
                headers: {
                    'X-Request-Origin': fastify.internalToken('gateway'),
                },
            });
        } catch (error) {
            fastify.log.error(error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    };

    fastify.post('/refresh', forward);
    fastify.post('/signup', { schema: schemas.signupSchema }, forward);
    fastify.post('/login', { schema: schemas.loginSchema }, forward);
    fastify.post('/logout', forward);

    fastify.post('/forgot-password', { schema: schemas.emailSchema }, forward);
    fastify.post('/reset-password', { schema: schemas.resetPasswordSchema }, forward);

    fastify.post('/verify-user', { schema: schemas.codeSchema }, forward);
    fastify.post('/resend-code', { schema: schemas.emailSchema }, forward);

    fastify.post('/complete-profile/:username', { schema: schemas.complitProfileSchema }, forward);

    fastify.get('/callback', forward);
}
