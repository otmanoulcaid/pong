import { config } from '../config/env.config.js';
import Database from 'better-sqlite3';
import fp from 'fastify-plugin';
import fs from 'fs/promises';

import UserRepo from '../repository/user.repository.js';

export default fp
(
    async (fastify) => 
    {
        const filePath = new URL ('../data/queries.sql', import.meta.url);
        const queries = await fs.readFile (filePath, 'utf-8');
        const db = new Database (config.db_path);
        
        const  userRepo = new UserRepo (db); 

        db.exec (queries);
        fastify.decorate ('db', db);
        fastify.decorate ('users_db', userRepo);

    }  
)