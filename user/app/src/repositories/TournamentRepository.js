class TournamentRepository
{
    constructor(db)
    {
        this.db = db;
    }

    async insertTournament( data )
    {
        await this.db.insert('Tournament', data);
    }

    async getAllTournaments()
    {
        const query = `
            SELECT 
                t.name,
                u.username AS player,
                p.level
            FROM tournament t
            JOIN players p ON p.tournament_id = t.id
            JOIN user u ON u.id = p.id
        `;
        return await this.db.all(query);
    }
}

export { TournamentRepository }
