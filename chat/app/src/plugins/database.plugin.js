import fp from 'fastify-plugin';
import fs from 'fs';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import {UserRepository} from '../repositories/user.repository.js';

export default fp(async (fastify) => {
    const chatSchema = await fs.promises.readFile(new URL('../data/chat.sql', import.meta.url), 'utf-8');    
    const databasePath = fileURLToPath(new URL('../data/chat.sqlite', import.meta.url));
    const db = new Database(databasePath);
    const userRepo = new UserRepository (db);

    try {
        db.exec(chatSchema);
    } catch (error) {
        console.error('Error executing database schemas:', error);
    }

    fastify.decorate('db', db);
    fastify.decorate('users_db', userRepo);
});