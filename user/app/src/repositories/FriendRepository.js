class FriendRepository
{
    constructor(db)
    {
        this.db = db;
    }

    async selectAllfriends( uid )
    {
        const query = `
            SELECT f.id as friendship, u.id as uid, u.username, f.u_from, f.u_to, f.stat
            FROM friend f
            JOIN user u ON u.id = f.u_to
            WHERE f.u_from = ?

            UNION

            SELECT f.id as friendship, u.id as uid, u.username, f.u_from, f.u_to, f.stat
            FROM friend f
            JOIN user u ON u.id = f.u_from
            WHERE f.u_to = ?
        `;
        const users = await this.db.all(query, [uid, uid]);
        return users;
    }

    async insertFriendship( friendship )
    {
        await this.db.insert('friend', friendship);
    }
    
    async deleteFriendship( friendship )
    {
        await this.db.delete('friend', friendship);
    }
    
    async updateFriendship(stat, friendship )
    {
        await this.db.update('friend', { stat }, friendship);
    }
}

export { FriendRepository };
