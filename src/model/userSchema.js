const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
    },
    verify: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);