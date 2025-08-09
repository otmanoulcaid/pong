-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS friends;
-- DROP TABLE IF EXISTS messages;

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    u_from TEXT NOT NULL,
    u_to TEXT NOT NULL,
    content TEXT NOT NULL,
    stat TEXT DEFAULT 'u',

    CHECK (stat IN ('d', 'u'))
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    avatar_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS friends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    u_from TEXT NOT NULL,
    u_to TEXT NOT NULL,
    stat TEXT NOT NULL,

    CHECK (stat IN ('pending', 'accepted', 'blocked')),
    FOREIGN KEY (u_from) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (u_to) REFERENCES users(username) ON DELETE CASCADE
);

DELETE FROM users WHERE true;
DELETE FROM messages WHERE true;
DELETE FROM friends WHERE true;


INSERT INTO users (id, username, avatar_url) VALUES
(1, 'ayoub', 'https://example.com/avatar/ayoub.png'),
(2, 'fatima', 'https://example.com/avatar/fatima.png'),
(3, 'youssef', 'https://example.com/avatar/youssef.png'),
(4, 'salma', 'https://example.com/avatar/salma.png'),
(5, 'hamza', 'https://example.com/avatar/hamza.png'),
(6, 'zineb', 'https://example.com/avatar/zineb.png'),
(7, 'khalid', 'https://example.com/avatar/khalid.png'),
(8, 'imane', 'https://example.com/avatar/imane.png'),
(9, 'reda', 'https://example.com/avatar/reda.png'),
(10, 'sara', 'https://example.com/avatar/sara.png');


INSERT INTO friends (u_from, u_to, stat) VALUES
('khalid', 'hamza', 'accepted'),
('fatima', 'hamza', 'accepted'),
('sara', 'imane', 'blocked'),
('zineb', 'sara', 'accepted'),
('reda', 'imane', 'accepted'),
('khalid', 'zineb', 'pending'),
('ayoub', 'sara', 'accepted'),
('khalid', 'sara', 'accepted'),
('fatima', 'zineb', 'pending'),
('khalid', 'ayoub', 'accepted'),
('sara', 'hamza', 'blocked');


INSERT INTO messages (u_from, u_to, content, stat) VALUES
('imane', 'zineb', 'Hey zineb, this is imane!', 'd'),
('sara', 'zineb', 'Hey zineb, this is sara!', 'u'),
('imane', 'khalid', 'Hey khalid, this is imane!', 'd'),
('sara', 'fatima', 'Hey fatima, this is sara!', 'u'),
('salma', 'zineb', 'Hey zineb, this is salma!', 'd'),
('salma', 'zineb', 'Hey zineb, this is salma!', 'u'),
('sara', 'zineb', 'Hey zineb, this is sara!', 'd'),
('fatima', 'imane', 'Hey imane, this is fatima!', 'u'),
('khalid', 'zineb', 'Hey zineb, this is khalid!', 'u'),
('zineb', 'reda', 'Hey reda, this is zineb!', 'u');
