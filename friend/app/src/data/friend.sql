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
DELETE FROM friends WHERE true;

INSERT INTO users (id, username, avatar_url) VALUES
(1, 'ayoub', 'https://live.staticflickr.com/65535/51255374582_8a76f7c64b_b.jpg'),
(2, 'fatima', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80'),
(3, 'youssef', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=400'),
(4, 'salma', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'),
(5, 'hamza', 'https://live.staticflickr.com/65535/51255374582_8a76f7c64b_b.jpg'),
(6, 'zineb', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'),
(7, 'khalid', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=400'),
(8, 'imane', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80'),
(9, 'reda', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=400'),
(10, 'sara', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80');

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
