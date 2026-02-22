require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const dbConnection = require('./src/config/dbConnection');
const router = require('./src/route/index');

app.use(cors());
app.use(express.json());

// Uploads won't persist on Vercel — consider Cloudinary/S3 for production
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(router);

// Connect to DB
dbConnection();

// Only listen locally — Vercel handles this itself in production
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;