require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path'); // Standard practice
const app = express();
const port = process.env.PORT || 3000; // Use Env variable
const dbConnection = require('./src/config/dbConnection');
const router = require('./src/route/index');

app.use(cors());
app.use(express.json());

// 1. Correct Static Path with Prefix
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 2. Routes
app.use(router);

dbConnection();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;