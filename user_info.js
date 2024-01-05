const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'juhu89Fx#',
    database: 'users'
});

client.connect();



function fetchData(id) {
    return new Promise((resolve, reject) => {
        client.query('SELECT * FROM "user" WHERE user_id = $1', [id], (err, res) => {
            if (err) {
                console.error(err.message)
                reject(err);
            }
            else {
                if (res.rows.length > 0) {
                    const name = res.rows[0].user_name;
                    console.log("name " + name);
                    resolve(name);
                }
                else {
                    resolve('')
                }
            }
        });
    });

}

module.exports = { fetchData };
