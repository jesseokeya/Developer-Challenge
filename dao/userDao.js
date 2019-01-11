const mongoose = require('mongoose')
const User = mongoose.model('User')

class UserDao {
    constructor(options = {}) {
        this.options = options
    }

    async createUser({ username, email, password }) { }

    async getUsers() { return User.find() }

    async getUser(userId) { return User.findById(userId) }

    async updateUser(fields) {}

    async deleteUser(userId) {}
}

module.exports = UserDao