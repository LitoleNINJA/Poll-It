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

module.exports = {
    getOptions
}