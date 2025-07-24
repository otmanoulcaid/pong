CREATE TABLE IF NOT EXISTS friends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    u_from INTEGER NOT NULL,
    u_to INTEGER NOT NULL,
    stat TEXT DEFAULT 'pending',

    CHECK (stat IN ('pending', 'accepted', 'blocked')),
    FOREIGN KEY (u_from) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (u_to) REFERENCES users(id) ON DELETE CASCADE
);
