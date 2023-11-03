const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8888;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

// HTTP logger
app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
