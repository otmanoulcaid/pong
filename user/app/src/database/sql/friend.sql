DROP TABLE IF EXISTS friend;

CREATE TABLE IF NOT EXISTS friend (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    u_from INTEGER NOT NULL,
    u_to INTEGER NOT NULL,
    stat TEXT DEFAULT 'pending',

     --friend table constraint
    UNIQUE(u_from, u_to)
    CHECK (stat IN ('pending', 'accepted', 'blocked')),
    FOREIGN KEY (u_from) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (u_to) REFERENCES user(id) ON DELETE CASCADE
);

--mock data

INSERT OR IGNORE INTO friend (u_from, u_to, stat) VALUES 
(1, 2, 'pending'),
(3, 1, 'accepted'),
(1, 4, 'blocked'),
(2, 4, 'pending'),
(3, 4, 'accepted');