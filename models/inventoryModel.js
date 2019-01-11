const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    store: {
        name: String,
        userId: mongoose.Schema.ObjectId
    },
    
    products: [mongoose.Schema.ObjectId]
    
}, { timestamps: true })

const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = Inventory