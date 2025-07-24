import fp from 'fastify-plugin';
import fs from 'fs';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';

export default fp(async (fastify) => {
    const friendSchema = await fs.promises.readFile(new URL('../data/friend.sql', import.meta.url), 'utf-8');
    const chatSchema = await fs.promises.readFile(new URL('../data/chat.sql', import.meta.url), 'utf-8');
    
    const databasePath = fileURLToPath(new URL('../data/data.sqlite', import.meta.url));
    const db = new Database(databasePath);

    try {
        db.exec(friendSchema);
        db.exec(chatSchema);
    } catch (error) {
        console.error('Error executing database schemas:', error);
    }

    fastify.decorate('db', db);
});