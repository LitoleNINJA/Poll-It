const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../db');

const register = (req, res, next) => {
    const { name, username, email, password } = req.body;
    pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email], (err, result) => {
        if (err) {
            next(err);
        } else {
            if (result.rows.length > 0) {
                res.status(409).json({ error: 'Username or Email already exists !' });
            } else {
                const hashedPassword = bcrypt.hashSync(password, 10);
                pool.query('INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4)', [name, username, email, hashedPassword], (err, result) => {
                    if (err) {
                        next(err);
                    } else {
                        res.status(201).json({ message: 'User created successfully' });
                    }
                });
            }
        }
    });
};

const login = (req, res, next) => {
    const { email, password } = req.body;
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
        if (err) {
            next(err);
        } else {
            if (result.rows.length > 0) {
                const user = result.rows[0];
                if (password === user.user_password || bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
                    res.status(200).json({
                        user: {
                            id: user.id,
                            name: user.name,
                            username: user.username,
                            email: user.email,
                            token: token
                        }
                    });
                } 
                else {
                    res.status(401).json({ error: 'Invalid credentials' });
                }
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
    });
};

const getUsers = (req, res, next) => {
    pool.query('SELECT * FROM users', (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json(result.rows);
        }
    });
};

const getUser = (req, res, next) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json(result.rows[0]);
        }
    });
};

module.exports = {
    register,
    login,
    getUsers,
    getUser
};