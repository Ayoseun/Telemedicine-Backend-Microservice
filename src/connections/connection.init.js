const { Pool } = require('pg');
const COMMON_CONFIG = require('../config/common');

let pool;

try {
    pool = new Pool({
        user: COMMON_CONFIG.SECURITY_KEY.USER,
        password: COMMON_CONFIG.SECURITY_KEY.DB_PASSWORD,
        host: COMMON_CONFIG.SECURITY_KEY.DB_HOST,
        port: COMMON_CONFIG.SECURITY_KEY.DB_PORT,
        database: COMMON_CONFIG.SECURITY_KEY.DB_NAME,
        max:200,
        connectionTimeoutMillis:20000,
        idleTimeoutMillis:20000,
        ssl: { rejectUnauthorized: false },
    });
} catch (error) {
    console.error('Error initializing database connection pool:', error);
    // Close the pool if it was created before the error occurred.
    if (pool) {
        pool.end((err) => {
            if (err) {
                console.error('Error closing database connection pool:', err);
            }
            // Handle the error or exit the application as needed.
        });
    }
    // Handle the error or exit the application as needed.
}

module.exports = pool;
