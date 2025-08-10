CREATE TABLE IF NOT EXISTS Pongs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    opponent_id INTEGER NOT NULL,
    tournament_id INTEGER,
    player_score INTEGER NOT NULL,
    opponent_score INTEGER NOT NULL,
    winner_id INTEGER NOT NULL,
    game_date TEXT NOT NULL,
    FOREIGN KEY (tournament_id) REFERENCES Tournaments(id) ON DELETE CASCADE,
    FOREIGN KEY (opponent_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (winner_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

INSERT INTO Pongs (user_id, opponent_id, tournament_id, player_score, opponent_score, winner_id, game_date) VALUES
(8, 4, 2, 0, 0, 4, '2025-07-11'),
(9, 10, 1, 1, 10, 10, '2025-07-21'),
(5, 7, 3, 4, 6, 7, '2025-07-14'),
(2, 10, 3, 1, 7, 10, '2025-06-27'),
(1, 7, 2, 10, 5, 1, '2025-07-24'),
(7, 8, 4, 0, 10, 8, '2025-07-08'),
(2, 1, 4, 4, 4, 1, '2025-07-08'),
(4, 8, 1, 5, 1, 4, '2025-07-13'),
(10, 6, 4, 3, 6, 6, '2025-07-23'),
(8, 6, 2, 1, 10, 6, '2025-07-17');