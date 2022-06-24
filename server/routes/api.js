const User = require('../controllers/user');
const Poll = require('../controllers/poll');
const Option = require('../controllers/option'); 
const verifyUser = require('../middlewares/user');

const api = (app) => {

    app.get('/api/users', verifyUser, User.getUsers);
    app.get('/api/users/:id', verifyUser, User.getUser);
    app.post('/api/register', User.register);
    app.post('/api/login',  User.login);

    app.get('/api/polls', Poll.getPolls);
    app.get('/api/polls/:id', Poll.getPoll);

    app.get('/api/option/:id', Option.getOptions);
};

module.exports = api;