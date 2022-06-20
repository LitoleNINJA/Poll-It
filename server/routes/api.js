const User = require('../controllers/user');
const verifyUser = require('../middlewares/user');

const api = (app) => {

    app.get('/api/users', verifyUser, User.getUsers);
    app.post('/api/register', User.register);
    app.post('/api/login',  User.login);
};

module.exports = api;