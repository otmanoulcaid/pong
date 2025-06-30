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
}

export { TournamentRepository }
