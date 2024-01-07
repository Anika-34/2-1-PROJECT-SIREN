const { Pool } = require("pg");

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'juhu89Fx#',
    database: 'db1'
});

pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
});

pool.connect();

module.exports = {
    query: (text, params) => pool.query(text, params),
};
