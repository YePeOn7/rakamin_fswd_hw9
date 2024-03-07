const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "12345678",
    database: "movies_db",
    host: "localhost",
    port: 5432,
});

module.exports = pool;