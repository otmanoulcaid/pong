export class UserRepository
{
    constructor(db)
    {
        this.db = db;
    }

    async insert(data)
    {
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const params = Object.values(data);
    
        const query = `INSERT INTO users (${columns}) VALUES (${placeholders})`;
        return this.db.prepare(query).run(params);
    }

    async findAll()
    {
        const query = `SELECT * FROM users`;
        return this.db.prepare(query).all();
    }

    async findOne(field)
    {
        const column = Object.keys(field)[0];
        const value = field[column];
    
        const query = `SELECT * FROM users WHERE ${column} = ?`;
        return this.db.prepare(query).get(value);
    }

    async update(field, data)
    {
        const column = Object.keys(field)[0];
        const params = [...Object.values(data), field[column]];
        const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
    
        const query = `UPDATE users SET ${updates} WHERE ${column} = ?`;
        return this.db.prepare(query).run(params);
    }

    async delete(field)
    {
        const column = Object.keys(field)[0];
        const value = field[column];
        const query = `DELETE FROM users WHERE ${column} = ?`;
        return this.db.prepare(query).run(value);
    }

    setUsername(username, newusername) 
    {
        return this.db.prepare('UPDATE users SET username=?  WHERE username = ?').run(newusername, username);
    }
    setAvatarurl(username, avatarUrl) 
    {
        return this.db.prepare('UPDATE users SET avatar_url=?  WHERE username = ?').run(avatarUrl, username);
    }
    createUser(username, avatar_url) 
    {
        return this.db.prepare('INSERT INTO users (username, avatar_url) VALUES (?, ?)').run(username, avatar_url);
    }
}
