const pool = require('../db');

const getOptions = (req, res, next) => {
    const pollId = req.params.id;
    pool.query('SELECT * FROM poll_options WHERE poll_id = $1', [pollId], (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json(result.rows);
        }
    });
};

const addVote = (req, res, next) => {
    const optionId = req.params.id;
    pool.query('UPDATE poll_options SET votes = votes + 1 WHERE id = $1 RETURNING *', [optionId], (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json(result.rows);
        }
    });
}


module.exports = {
    getOptions,
    addVote
}