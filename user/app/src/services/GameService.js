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
    
    async getTournamentsHistory()
    {
        const tournaments = await this.tournamentRepository.getAllTournaments();
        let resultedTournament = []
        tournaments.forEach(tournament => {
            let name = tournament.name;
            delete tournament.name;
            const element = resultedTournament.find(resulted => resulted.name == name)
            if (element)
                element.players.push(tournament);
            else
                resultedTournament.push({
                    name,
                    players: [ tournament ]
                })
        });
        return resultedTournament;
    }
    
    async newPlayerEntry( data )
    {
        await this.playerRepository.insert( data );
    }
}

export { GameService }
