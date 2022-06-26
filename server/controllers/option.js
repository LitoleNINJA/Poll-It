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

const addOption = (req, res, next) => {
    const { pollId, options } = req.body;
    options.forEach(option => {
        pool.query('INSERT INTO poll_options (poll_id, option_text, votes) VALUES ($1, $2, $3) RETURNING *', [pollId, option, 0], (err, result) => {
            if (err) {
                next(err);
            } 
        });
    });
    res.status(200).json({ message: 'Options added !' });
}

const addVote = (req, res, next) => {
    const optionId = req.params.id;
    const pollId = req.body.pollId;
    pool.query('UPDATE poll_options SET votes = votes + 1 WHERE id = $1 RETURNING *', [optionId], (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.query('UPDATE poll SET total_votes = total_votes + 1 WHERE id = $1 RETURNING *', [pollId], (err, result) => {
        if (err) {
            next(err);
        }
    });
}


module.exports = {
    getOptions,
    addOption,    
    addVote
}