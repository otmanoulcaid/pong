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
            SELECT u.username, u.avatar_url, f.stat
            FROM users u
            JOIN friends f ON (u.username = f.u_from OR u.username = f.u_to)
            WHERE (f.u_from = ? OR f.u_to = ?)
                AND f.stat <> 'blocked'
                AND u.username <> ?
        `;
        let friends = this.db.prepare(query).all([username, username, username]);
        return friends;
    }

    findOne(u_from, u_to)
    {
        const query = `SELECT * FROM friends WHERE (u_from = ? AND u_to = ?) OR (u_from = ? AND u_to = ?)`;
        const params = [u_from, u_to, u_to, u_from];
        return this.db.prepare(query).all(params);
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
}
