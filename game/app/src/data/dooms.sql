CREATE TABLE IF NOT EXISTS Dooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    opponent_id INTEGER NOT NULL,
    winner_id INTEGER NOT NULL,
    game_date TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (winner_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (opponent_id) REFERENCES Users(id) ON DELETE CASCADE
);

INSERT INTO Dooms (user_id, opponent_id, winner_id, game_date) VALUES
(8, 1, 1, '2025-07-20'),
(8, 9, 9, '2025-07-19'),
(7, 2, 7, '2025-07-22'),
(8, 6, 6, '2025-07-02'),
(4, 2, 4, '2025-07-07'),
(9, 2, 9, '2025-07-19'),
(5, 4, 5, '2025-06-30'),
(3, 9, 9, '2025-06-28'),
(5, 3, 3, '2025-07-18'),
(5, 8, 8, '2025-07-07');