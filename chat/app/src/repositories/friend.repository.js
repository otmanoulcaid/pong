import { config } from "../config/env.config.js";

export class FriendRepository
{
    constructor(db)
    {
        this.db = db;
    }

    insert(friend)
    {
        const query = `INSERT INTO friends (u_from, u_to, stat) VALUES (?, ?, ?)`;
        const params = [friend.u_from, friend.u_to, friend.stat];
        return this.db.prepare(query).run(params);
    }

    findAll()
    {
        return this.db.prepare('SELECT * FROM friends').all();
    }

    findAllFriends(username) {
        const query = `
            SELECT u.username, u.avatar_url
            FROM users u
            JOIN friends f ON (u.username = f.u_from OR u.username = f.u_to)
            WHERE (f.u_from = ? OR f.u_to = ?)
                AND f.stat <> 'blocked'
                AND u.username <> ?
        `;
        let friends = this.db.prepare(query).all([username, username, username]);
        return friends;
    }

    update(data)
    {
        const query = `UPDATE friends SET stat = ? WHERE u_from = ? AND u_to = ?`;
        const params = [data.stat, data.u_from, data.u_to];
        return this.db.prepare(query).run(params);
    }

    delete(u_from, u_to)
    {
        const query = `DELETE FROM friends WHERE u_from = ? OR u_to = ?`;
        const params = [u_from, u_to];
        return this.db.prepare(query).run(params);
    }

    async findFriendShip(u_from, u_to)
    {
        const response = await fetch(`${config.servers.friend}/internal/friends?from=${u_from}&to=${u_to}`);
        return await response.json();
    }

    async getUserByUsername(username)
    {
        const response = await fetch(`${config.servers.friend}/internal/users/${username}`);
        return await response.json();
    }
}
