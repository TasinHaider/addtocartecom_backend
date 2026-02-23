const mongoose = require('mongoose');

const dbConnection = () => {
    const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@pos.qpbydsd.mongodb.net/POS?appName=POS`;

    mongoose.connect(uri)
        .then(() => {
            console.log('✅ Database connection successful');
        })
        .catch((err) => {
            console.error('❌ Database connection error:');
            console.error(err.message);
        });
}

module.exports = dbConnection;