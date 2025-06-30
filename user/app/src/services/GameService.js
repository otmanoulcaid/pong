class GameService
{
    constructor(gameRepository, tournamentRepository, playerRepository)
    {
        this.gameRepository = gameRepository;
        this.tournamentRepository = tournamentRepository;
        this.playerRepository = playerRepository;
    }

    async newGameEntry( data )
    {
        return await this.gameRepository.insert( data );
    }

    async getGameHistory( username )
    {
        return await this.gameRepository.getGamesByUsername( username ); 
    }

    async getNumberOfGamesWon( username )
    {
        const games = await this.gameRepository.getGamesByUsername( username );
        const wonGames = games.filter(e => e.won);
        return wonGames.length;
    }
    
    async getNumberOfGamesLost( username )
    {
        const games = await this.gameRepository.getGamesByUsername( username );
        const lostGames = games.filter(e => e.won);
        return lostGames.length;
    }

    async getTotalNumberOfGames( username )
    {
        const games = await this.gameRepository.getGamesByUsername( username );
        return games.length;
    }

    async newTournamentEntry( data )
    {
        await this.tournamentRepository.insert( data );
    }
    
    async getTournamentHistory()
    {
        return await this.tournamentRepository.getAllTournaments();
    }
    
    async newPlayerEntry( data )
    {
        await this.playerRepository.insert( data );
    }
}

export { GameService }
