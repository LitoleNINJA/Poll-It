const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./server/config/db')();
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));