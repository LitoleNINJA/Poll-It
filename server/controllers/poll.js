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
    if(req.params.id.length === 32) {
        const url = req.params.id;
        pool.query('SELECT * FROM poll WHERE url = $1', [url], (err, result) => {
            if (err) {
                next(err);
            } else {
                res.status(200).json(result.rows[0]);
            }
        });
    } else {
        const id = parseInt(req.params.id);
        pool.query('SELECT * FROM poll WHERE id = $1', [id], (err, result) => {
            if (err) {
                next(err);
            } else {
                res.status(200).json(result.rows[0]);
            }
        });
    }
};

const addPoll = (req, res, next) => {
    let { question, visibility, settings, username, voters } = req.body;
    if(!username) {
        username = 'Anonymous';
    }
    let url = null;
    if(visibility === 'Private')
        url = crypto.randomBytes(16).toString('hex');
    pool.query('INSERT INTO poll (question, visibility, settings, username, voters, total_votes, url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [question, visibility, settings, username, voters, 0, url], (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result.rows[0]);
        }
    });
}

const updatePoll = (req, res, next) => {
    const id = parseInt(req.params.id);
    const { voter } = req.body;
    pool.query('UPDATE poll SET voters = array_append(voters, $1) WHERE id = $2 RETURNING *', [voter, id], (err, result) => {
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
    addPoll,
    updatePoll
};