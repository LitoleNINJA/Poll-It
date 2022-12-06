const User = require('../controllers/user');
const Poll = require('../controllers/poll');
const Option = require('../controllers/option'); 
const Comment = require('../controllers/comment');
const verifyUser = require('../middlewares/user');

const api = (app) => {

    app.get('/api/users', verifyUser, User.getUsers);
    app.get('/api/users/:id', verifyUser, User.getUser);
    app.post('/api/register', User.register);
    app.post('/api/login',  User.login);

    app.get('/api/polls', Poll.getPolls);
    app.get('/api/polls/:id', Poll.getPoll);
    app.post('/api/polls', Poll.addPoll);
    app.put('/api/polls/:id', Poll.updatePoll);

    app.get('/api/option/:id', Option.getOptions);
    app.post('/api/option', Option.addOption);
    app.post('/api/option/:id', Option.addVote);

    app.get('/api/comment/:id', Comment.getComments);
    app.post('/api/comment/:id', Comment.addComment);
};

module.exports = api;