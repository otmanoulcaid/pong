CREATE TABLE IF NOT EXISTS friendship (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    u_from INTEGER NOT NULL,
    u_to INTEGER NOT NULL,
    stat TEXT NOT NULL,

     --friend table constraint
    CHECK (stat IN ('pending', 'accepted', 'blocked')),
    FOREIGN KEY (u_from) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (u_to) REFERENCES user(id) ON DELETE CASCADE,
);

--mock data

INSERT OR IGNORE INTO friendship (u_from, u_to, stat) VALUES 
(1, 2, 'pending'),
(1, 3, 'accepted'),
(1, 4, 'blocked'),
(2, 3, 'accepted'),
(2, 4, 'pending'),
(3, 4, 'accepted');
