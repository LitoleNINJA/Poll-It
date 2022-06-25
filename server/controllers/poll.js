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

const addPoll = (req, res, next) => {
    let { question, category, visibility, settings, user_id, voters } = req.body;
    if(!user_id) {
        user_id = 3;
    }
    pool.query('INSERT INTO poll (question, category, visibility, settings, user_id, voters) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [question, category, visibility, settings, user_id, voters], (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result.rows[0]);
        }
    });
}

module.exports = {
    getPolls,
    getPoll,
    addPoll
};