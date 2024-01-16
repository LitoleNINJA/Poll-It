const { Pool } = require('pg');

var pool;

if (process.env.NODE_ENV === 'production') {
    pool = new Pool({
        connectionString: process.env.POSTGRES_URL + "?sslmode=require",
    });
    
} else {
    pool = new Pool({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: process.env.PGPORT,
    });
}

pool.connect((err, done) => {
    if (err) throw err;
    console.log('connected to the vercel database');
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
};