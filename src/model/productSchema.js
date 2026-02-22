const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'category title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    image: {
        type: Array,
        required: [true, 'category image is required'],
        unique: true
    },
    slug: {
        type: String
    },
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)