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
        return games.filter(e => e.won)
    }
    
    async getNumberOfGamesLost( username )
    {
        const games = await this.gameRepository.getGamesByUsername( username );
        return games.filter(e => !e.won)
    }
    
    async getTotalNumberOfGames( username )
    {
        const games = await this.gameRepository.getGamesByUsername( username );
        return games.length;
    }

    newTournamentEntry( data )
    {
        this.tournamentRepository.insert( data );
    }
    
    newPlayerEntry( data )
    {
        this.playerRepository.insert( data );
    }
}

export { GameService }
