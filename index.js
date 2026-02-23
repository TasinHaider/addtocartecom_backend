require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const dbConnection = require('./src/config/dbConnection');
const router = require('./src/route/index');

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'https://addtocartecom.vercel.app',
]
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(router);

dbConnection();

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

//server status check
app.get('/', (req, res) => {
    res.json({ message: 'Server is running ✅' })
})

module.exports = app;