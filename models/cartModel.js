const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    userId: mongoose.Schema.ObjectId,

    productId: mongoose.Schema.ObjectId,

    inventoryId: mongoose.Schema.ObjectId

}, { timestamps: true })

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart