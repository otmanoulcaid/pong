import config from '../config/env.config.js'

export class UserRepository 
{
    async findUserByEmail(email)
    {
        let user = this.#getFetch(`/internal/users/email/${email}`);
        return user;
    }

    async findUserByUsername(username)
    {
        let user = this.#getFetch(`/internal/users/username/${username}`);
        return user;
    }

    async createUser(email, username, hashedPassword)
    {
        const response = await this.#postFetch(`/internal/users`, {
            email,
            username,
            hashedPassword
        });
        return response;
    }

    async setPasswordByEmail (email, hashedPassword)
    {
        const response = await this.#postFetch('/internal/users/password', {
            email,
            hashedPassword
        });
        return response;
    }

    async setAvatarurl(username, picture)
    {
        const response = await this.#postFetch('/internal/users/avatar', {
            email,
            picture
        });
        return response;
    }

    async #getFetch(uri)
    {
        try {
            const response = await fetch(config.servers.USER + uri)
            return await response.json()
        } catch (error) {
            return null;
        }
    }
    async #postFetch(uri, body)
    {
        try {
            const response = await fetch(config.servers.USER + uri, {
                method: 'POST',
                body: JSON.stringify(body)
            });
            return await response.json()
        } catch (error) {
            return null;
        }
    }
}
