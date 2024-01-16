const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const http = require('http')
const { Server } = require("socket.io");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

require('./routes/api')(app);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

io.on('connection', (socket) => {
    console.log('a user connected with id', socket.id);

    socket.on('join', (poll) => {
        console.log('user', socket.id, 'joined poll', poll);
        socket.join(poll);
    });
    
    socket.on('vote', (poll, options) => {
        console.log('recieved', poll.id, options);
        socket.to(poll.id).emit('vote', poll.total_votes+1, options);
    });

    socket.on('disconnect', () => {
        socket.disconnect();
        console.log('user disconnected with id', socket.id);
    });
});
httpServer.listen(process.env.SOCKET_PORT || 3001, () => {
    console.log('socketio server listening');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
