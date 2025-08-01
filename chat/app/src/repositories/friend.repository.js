export class FriendRepository
{
    constructor(db)
    {
        this.db = db;
    }

    async insert(friend)
    {
        const query = `INSERT INTO friends (u_from, u_to, stat) VALUES (?, ?, ?)`;
        const params = [friend.u_from, friend.u_to, friend.stat];
        return this.db.prepare(query).run(params);
    }

    findAll(userid) {
        const query = `
            SELECT * FROM users
            WHERE id IN (
                SELECT u_to FROM friends WHERE u_from = ?
                UNION
                SELECT u_from FROM friends WHERE u_to = ?
            )
        `;
        let friends = this.db.prepare(query).all([userid, userid]);
        return friends;
    }

    async findOne(u_from, u_to)
    {
        const query = `SELECT * FROM friends WHERE u_from = ? AND u_to = ?`;
        const params = [u_from, u_to];
        return this.db.prepare(query).get(params);
    }

    async update(data)
    {
        const query = `UPDATE friends SET stat = ? WHERE u_from = ? AND u_to = ?`;
        const params = [data.stat, data.u_from, data.u_to];
        return this.db.prepare(query).run(params);
    }

    async delete(u_from, u_to)
    {
        const query = `DELETE FROM friends WHERE u_from = ? OR u_to = ?`;
        const params = [u_from, u_to];
        return this.db.prepare(query).run(params);
    }
}
