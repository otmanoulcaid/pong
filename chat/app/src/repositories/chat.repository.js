export class ChatRepository
{
    constructor(db)
    {
        this.db = db
    }

    insertMessage({sender, reciever, content})
    {
        const query = `INSERT INTO messages(u_from, u_to, content) VALUES(?, ?, ?)`
        this.db.prepare(query).run([sender, reciever, content])
    }

    findMessage(from)
    {
        const query = `SELECT * FROM messages WHERE u_from = ?`
        return this.db.prepare(query).all(from)
    }

    findNoneReadMessages(from)
    {
        const query = `SELECT u_from, u_to, content FROM messages WHERE u_to = ? AND stat = ?`;
        return this.db.prepare(query).all([ from, 'u']);
    }

    update(u_to, field)
    {
        const key = Object.keys(field)[0]
        const query = `UPDATE messages set ${key} = ? where u_to = ?`;
        return this.db.prepare(query).run([field[key], u_to]);
    }
}
