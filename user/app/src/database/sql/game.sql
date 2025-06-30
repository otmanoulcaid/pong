DROP TABLE IF EXISTS Tournament;
DROP TABLE IF EXISTS Players;
DROP TABLE IF EXISTS Games;

CREATE TABLE IF NOT EXISTS Tournament (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userid INTEGER NOT NULL,
    tournament_id INTEGER NOT NULL,
    level DECIMAL DEFAULT 0.0,
    FOREIGN KEY (tournament_id) REFERENCES Tournament(id) ON DELETE CASCADE
    FOREIGN KEY (userid) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userid INTEGER NOT NULL,
    opponent TEXT NOT NULL,
    won BOOLEAN NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY (userid) REFERENCES user(id) ON DELETE CASCADE
);


INSERT INTO Tournament (date, name) VALUES 
('2025-07-01', 'tappiya'),
('2025-08-15', 'billiard');

INSERT INTO Players (userid, tournament_id, level) VALUES 
(1, 1, 10.0),
(2, 1, 12.5),
(3, 2, 11.90);

INSERT INTO Games (userid, opponent, won, date) VALUES
(1, 'salam', 1, '2025-07-03'),
(1, 'kalam', 0, '2025-07-04'),
(1, '3alam', 1, '2025-07-05');

INSERT INTO Games (userid, opponent, won, date) VALUES
(2, '3alam', 1, '2025-07-04'),
(2, 'kalam', 1, '2025-07-06');
