const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    price: {
        type: Number,
        required: true
    },

    inventory_count: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema)

module.exports = Product;