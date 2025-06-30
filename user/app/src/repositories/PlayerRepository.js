class PlayerRepository
{
    constructor(db)
    {
        this.db = db;
    }

    async insertPlayer( data )
    {
        await this.db.insert('Players', data);
    }
}

export { PlayerRepository }
