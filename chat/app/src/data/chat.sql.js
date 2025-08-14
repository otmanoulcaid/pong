export const chatSql = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    u_from TEXT NOT NULL,
    u_to TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    stat TEXT DEFAULT 'u',

    CHECK (stat IN ('d', 'u'))
);

DELETE FROM messages WHERE true;

INSERT INTO messages (u_from, u_to, message, stat) VALUES
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
`