const pool = require('../db');

const getComments = (req, res, next) => {
    const pollId = req.params.id;
    pool.query('SELECT * FROM user_comments WHERE poll_id = $1', [pollId], (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result.rows);
        }
    });
};

const addComment = (req, res, next) => {
    const pollId = req.params.id;
    const { comment, user_id } = req.body;
    pool.query('INSERT INTO user_comments (poll_id, comment_text, user_id) VALUES ($1, $2, $3) RETURNING *', [pollId, comment, user_id], (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result.rows);
        }
    });
};

module.exports = {
    getComments,
    addComment
}