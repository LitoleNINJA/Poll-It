const { Client, Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'pollapp',
    port: 5432,
});

pool.connect((err, client, done) => {
    if (err) throw err;
    console.log('connected to the database');
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
};