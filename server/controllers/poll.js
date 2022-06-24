const pool = require('../db');

const getPolls = (req, res, next) => {
    pool.query('SELECT * FROM poll', (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result.rows);
        }
    });
};

const getPoll = (req, res, next) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM poll WHERE id = $1', [id], (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result.rows[0]);
        }
    });
};

module.exports = {
    getPolls,
    getPoll
};