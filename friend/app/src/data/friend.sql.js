export const friendSql = `CREATE TABLE IF NOT EXISTS users (
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
DELETE FROM friends WHERE true;

INSERT INTO users (id, username, avatar_url) VALUES
(1, 'ayoub', 'https://res.cloudinary.com/drpmyxx4c/image/upload/v1751976105/avatars/avatar175.png'),
(2, 'fatima', 'https://res.cloudinary.com/drpmyxx4c/image/upload/v1751976105/avatars/avatar165.png'),
(3, 'youssef', 'https://res.cloudinary.com/drpmyxx4c/image/upload/v1751976105/avatars/avatar155.png'),
(4, 'salma', 'https://res.cloudinary.com/drpmyxx4c/image/upload/v1751976105/avatars/avatar145.png'),
(5, 'hamza', 'https://res.cloudinary.com/drpmyxx4c/image/upload/v1751976105/avatars/avatar135.png'),
(6, 'zineb', 'https://res.cloudinary.com/drpmyxx4c/image/upload/v1751976105/avatars/avatar179.png'),
(7, 'khalid', 'https://res.cloudinary.com/drpmyxx4c/image/upload/v1751976105/avatars/avatar115.png'),
(8, 'imane', 'https://res.cloudinary.com/drpmyxx4c/image/upload/v1751976105/avatars/avatar173.png'),
(9, 'reda', 'https://res.cloudinary.com/drpmyxx4c/image/upload/v1751976105/avatars/avatar177.png'),
(10, 'sara', 'https://res.cloudinary.com/drpmyxx4c/image/upload/v1751976105/avatars/avatar177.png'),
(11, 'otman', 'https://res.cloudinary.com/drpmyxx4c/image/upload/v1751976105/avatars/avatar135.png');

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
`


