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
    let { question, category, visibility, settings, username, voters } = req.body;
    if(!username) {
        username = 'anonymous';
    }
    pool.query('INSERT INTO poll (question, category, visibility, settings, username, voters, total_votes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [question, category, visibility, settings, username, voters, 0], (err, result) => {
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