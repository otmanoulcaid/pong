CREATE TABLE IF NOT EXISTS Contestants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    tournament_id INTEGER NOT NULL,
    round_level DECIMAL DEFAULT 0.0,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (tournament_id) REFERENCES Tournaments(id) ON DELETE CASCADE
);

INSERT INTO Contestants (user_id, tournament_id, round_level) VALUES
(3, 1, 0.5), (6, 1, 0.5), (1, 1, 0.3), (10, 1, 0.5), (2, 1, 0.4),
(7, 2, 0.0), (3, 2, 1.0), (4, 2, 0.5), (9, 2, 0.1), (4, 2, 0.4),
(4, 3, 0.8), (7, 3, 1.0), (6, 3, 0.0), (10, 3, 0.8), (4, 3, 0.7),
(4, 4, 0.6), (5, 4, 0.9), (4, 4, 0.6), (10, 4, 0.1), (6, 4, 0.8);
