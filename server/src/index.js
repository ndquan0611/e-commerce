const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8888;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

// HTTP logger
app.use(morgan('combined'));

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
    }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookie
app.use(cookieParser());

// Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
