const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: 'customer'
    },

    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },
    
    email: String
    
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User