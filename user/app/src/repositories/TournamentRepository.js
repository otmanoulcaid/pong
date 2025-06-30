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
            select * from tournament t
            join player p
            on p.tournament_id = t.id
        `;

        return await this.db.all(query);
    }
}

export { TournamentRepository }
