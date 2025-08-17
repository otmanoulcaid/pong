
DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    username VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR (21) NOT NULL,
    avatar_url  TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    bio  TEXT DEFAULT ''
);
DELETE FROM users WHERE true;

INSERT INTO users (
  email, username, password, avatar_url, created_at, is_verified, bio
) VALUES
('ayoub@example.com', 'ayoub', 'pass01secure',
 'https://www.pexels.com/photo/portrait-of-a-person-in-moroccan-landscape-30710629/',
 '2024-11-01 09:32:59', 0, 'Hello, I am Ayoub from Morocco!'),

('fatima@example.com', 'fatima', 'pass02secure',
 'https://www.pexels.com/photo/traditional-moroccan-portrait-in-marrakech-alley-30361918/',
 '2024-11-27 09:32:59', 1, 'Hello, I am Fatima from Morocco!'),

('youssef@example.com', 'youssef', 'pass03secure',
 'https://www.pexels.com/photo/portrait-of-a-person-in-moroccan-landscape-30710629/',
 '2025-03-04 09:32:59', 0, 'Hello, I am Youssef from Morocco!'),

('salma@example.com', 'salma', 'pass04secure',
 'https://www.pexels.com/photo/portrait-of-a-person-in-moroccan-landscape-30710629/',
 '2024-11-10 09:32:59', 0, 'Hello, I am Salma from Morocco!'),

('hamza@example.com', 'hamza', 'pass05secure',
 'https://www.pexels.com/photo/traditional-moroccan-portrait-in-marrakech-alley-30361918/',
 '2024-11-27 09:32:59', 1, 'Hello, I am Hamza from Morocco!'),

('zineb@example.com', 'zineb', 'pass06secure',
 'https://www.pexels.com/photo/traditional-moroccan-portrait-in-marrakech-alley-30361918/',
 '2024-12-20 09:32:59', 0, 'Hello, I am Zineb from Morocco!'),

('khalid@example.com', 'khalid', 'pass07secure',
 'https://www.pexels.com/photo/portrait-of-a-person-in-moroccan-landscape-30710629/',
 '2024-09-23 09:32:59', 0, 'Hello, I am Khalid from Morocco!'),

('imane@example.com', 'imane', 'pass08secure',
 'https://www.pexels.com/photo/portrait-of-a-person-in-moroccan-landscape-30710629/',
 '2024-07-30 09:32:59', 0, 'Hello, I am Imane from Morocco!'),

('reda@example.com', 'reda', 'pass09secure',
 'https://www.pexels.com/photo/traditional-moroccan-portrait-in-marrakech-alley-30361918/',
 '2025-06-09 09:32:59', 0, 'Hello, I am Reda from Morocco!'),

('sara@example.com', 'sara', 'pass10secure',
 'https://www.pexels.com/photo/traditional-moroccan-portrait-in-marrakech-alley-30361918/',
 '2024-09-17 09:32:59', 1, 'Hello, I am Sara from Morocco!');
