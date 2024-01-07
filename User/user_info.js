const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'juhu89Fx#',
    database: 'project_database'
});

client.connect();



function fetchData(id, passcode) {
    return new Promise((resolve, reject) => {
        client.query('SELECT * FROM "user" WHERE user_id = $1', [id], (err, res) => {
            if (err) {
                console.error(err.message)
                reject(err);
            }
            else {
                if (res.rows.length) {
                    //const name = res.rows[0].first_name + " "+res.rows[0].last_name;
                    // console.log("name : " + name);
                    const userInfo = res.rows[0];
                    // console.log("name : " + res.rows[0].first_name);
                    //resolve(name);
                    console.log(passcode);
                    const pass = userInfo.password;
                    console.log(pass + " " + id);
                    if (passcode === pass) resolve(userInfo);
                    else resolve(null)
                }
                else {
                    resolve(null)
                }
            }
        });
    });

}

module.exports = { fetchData };
