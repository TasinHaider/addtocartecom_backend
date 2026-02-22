const mongoose = require('mongoose'); // Changed from 'import' to const
const { Schema } = mongoose;

const cartSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: [true, 'product is required.']
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: [true, 'price is required.']
    }
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)