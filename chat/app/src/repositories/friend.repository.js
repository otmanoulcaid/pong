export class FriendRepository
{
    constructor(db)
    {
        this.db = db;
    }

    async insert(friend)
    {
        const query = `INSERT INTO friends (u_from, u_to, status) VALUES (?, ?, ?)`;
        const params = [friend.u_from, friend.u_to, friend.status];
        return this.db.prepare(query).run(params);
    }

    async findAll()
    {
        const query = `SELECT * FROM friends`;
        return this.db.prepare(query).all();
    }

    async findOne(u_from, u_to)
    {
        const query = `SELECT * FROM friends WHERE u_from = ? AND u_to = ?`;
        const params = [u_from, u_to];
        return this.db.prepare(query).get(params);
    }

    async update(u_from, u_to, stat)
    {
        const query = `UPDATE friends SET status = ? WHERE u_from = ? AND u_to = ?`;
        const params = [stat, u_from, u_to];
        return this.db.prepare(query).run(params);
    }

    async delete(u_from, u_to)
    {
        const query = `DELETE FROM friends WHERE u_from = ? OR u_to = ?`;
        const params = [u_from, u_to];
        return this.db.prepare(query).run(params);
    }
}
