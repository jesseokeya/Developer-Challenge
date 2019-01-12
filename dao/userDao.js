const mongoose = require('mongoose')
const User = mongoose.model('User')

/** 
 * Class representing the user data access object 
 */
class UserDao {
    constructor(options = {}) {
        this.options = options
    }

    /**
     * Creates a new User
     * @param {Object} params - { username, email, password }
     * @returns {Object} - new User
     */
    async createUser({ username, email, password }) {
        let newUser = new User({ username, email, password })
        newUser = await newUser.save()
        return newUser
    }

    /**
     * Gets all users from mongo database
     * @returns {[Object]} - array of user objects
     */
    async getUsers() {
        return User.find()
    }

    /**
     * Gets a particular user by Id
     * @param {String} userId - unique identification
     * @returns {Object} - user object
     */
    async getUser(userId) {
        return User.findById(userId)
    }

    /**
     * Gets a particular user by field
     * @param {Object} field - field(s) to retrieve a particular user by
     * @returns {Object} - user object
     */
    async getUserByCustomField(field) {
        return User.find(field)
    }

    /**
     * Updates an exisiting user
     * @param {Object} fields - fields to be updated
     * @returns {Object} - user object
     */
    async updateUser(fields) {
        const _id = fields.userId
        return User.findOneAndUpdate({ _id }, { $set: fields }, { new: true })
    }

    /**
     * Deletes a particular user by Id
     * @param {String} userId - unique identification
     * @returns {Object} - user object
     */
    async deleteUser(userId) {
        return User.findOneAndDelete({ _id: userId })
    }
}

module.exports = UserDao