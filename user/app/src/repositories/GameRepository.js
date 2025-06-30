class GameRepository
{
    constructor(db)
    {
        this.db = db;
    }

    async getGamesByUsername( username )
    {
        const query = `
            SELECT g.opponent, g.won, g.date
            FROM games g
            JOIN user u ON u.id = g.userid
            WHERE u.username = ?
        `;

        return await this.db.all(query, [ username ])
    }

    async insertGame( game )
    {
        await this.db.insert('Games', game);
    }

    async deleteGame( game )
    {

    }

    async updateGame(username, game )
    {

    }
}

export { GameRepository }