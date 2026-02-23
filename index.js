require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const dbConnection = require('./src/config/dbConnection');
const router = require('./src/route/index');

app.use(cors());
app.use(express.json());
app.use(router);

dbConnection();

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;