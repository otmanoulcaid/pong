CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    u_from TEXT NOT NULL,
    u_to TEXT NOT NULL,
    content TEXT NOT NULL,
    stat TEXT DEFAULT 'u',

    CHECK (stat IN ('d', 'u'))
);
