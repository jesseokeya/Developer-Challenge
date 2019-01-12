const mongoose = require('mongoose')
const User = mongoose.model('User')

class UserDao {
    constructor(options = {}) {
        this.options = options
    }

    async createUser({ username, email, password }) {
        let newUser = new User({ username, email, password })
        newUser = await newUser.save()
        return newUser
    }

    async getUsers() {
        return User.find()
    }

    async getUser(userId) {
        return User.findById(userId)
    }

    async getUserByCustomField(field) {
        return User.find(field)
    }

    async updateUser(fields) {
        const _id = fields.userId
        return User.findOneAndUpdate({ _id }, { $set: fields }, { new: true })
    }

    async deleteUser(userId) {
        return User.findOneAndDelete({ _id: userId })
    }
}

module.exports = UserDao