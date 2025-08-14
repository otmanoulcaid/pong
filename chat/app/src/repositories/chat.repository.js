export class ChatRepository
{
    constructor(db)
    {
        this.db = db
    }

    insertMessage({from, to, message, date})
    {
        const query = `INSERT INTO messages(u_from, u_to, message, date) VALUES(?, ?, ?, ?)`
        this.db.prepare(query).run([from, to, message, date])
    }

    findAll(sender, reciever)
    {
        const query = `
            SELECT u_from AS sender, message, date
            FROM messages
            WHERE (u_from = ? AND u_to = ?)
                OR (u_from = ? AND u_to = ?)
        `
        const messages = this.db.prepare(query).all([sender, reciever, reciever, sender]);
        return messages;
    }

    findMessage(from)
    {
        const query = `SELECT * FROM messages WHERE u_from = ?`
        return this.db.prepare(query).all(from)
    }

    findNoneReadMessages(to)
    {
        const query = `
            SELECT u_from AS sender, COUNT(message) AS unread
            FROM messages
            WHERE u_to = ? AND stat = 'u'
            GROUP BY u_from
        `;
        const messages = this.db.prepare(query).all([ to ]);
        return messages;
    }

    findLastMessage(to)
    {
        const query = `
            SELECT u_from AS sender, message, date
            FROM messages
            WHERE u_to = ? AND stat = 'u'
            ORDER BY date DESC
            LIMIT 1
        `;
        const message = this.db.prepare(query).get(to);
        return message;
    }

    update(u_to, field)
    {
        const key = Object.keys(field)[0]
        const query = `UPDATE messages set ${key} = ? where u_to = ?`;
        return this.db.prepare(query).run([field[key], u_to]);
    }
}
