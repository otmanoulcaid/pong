CREATE TABLE IF NOT EXISTS Tournaments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    winner_id INTEGER,
    tournament_date TEXT NOT NULL,
    tournament_name TEXT NOT NULL,
    FOREIGN KEY (winner_id) REFERENCES Users (id) ON DELETE CASCADE
);

INSERT INTO Tournaments (winner_id, tournament_date, tournament_name) VALUES
(7, '2025-07-13', 'Tournament_1'),
(1, '2025-07-08', 'Tournament_2'),
(4, '2025-07-19', 'Tournament_3'),
(7, '2025-07-13', 'Tournament_4');