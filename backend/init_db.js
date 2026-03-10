require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function initDB() {
    const client = await pool.connect();

    try {
        console.log('🔌 Connected to Supabase...');
        const schemaPath = path.join(__dirname, '../database/supabase_schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('📜 Executing Schema SQL...');

        // Split by statements if needed, but `client.query` can often run multiple statements at once for simple DDL
        await client.query(schemaSql);

        console.log('✅ Tables created successfully!');

    } catch (error) {
        console.error('❌ Error executing schema:', error);
    } finally {
        client.release();
        pool.end();
    }
}

initDB();
