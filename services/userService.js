const bcrypt = require('bcrypt')
const { isEmpty } = require('lodash')

class UserService {
    constructor({ UserDao }) {
        this.userDao = new UserDao()
    }

    async getUsers() {
        try {
            const users = await this.userDao.getUsers()
            return users
        } catch (err) {
            throw err
        }
    }

    async getUser(userId) {
        try {
            if (isEmpty(userId)) {
                throw new Error(`Bad Request expected userId to be string but got ${typeof userId}`)
            }
            const user = await this.userDao.getUser(userId)
            return user
        } catch (err) {
            throw err
        }
    }

    async createUser({ username, email, password }) {
        try {
            if (isEmpty(username) || isEmpty(password)) {
                throw new Error(`Bad Request`)
            }
            password = await this._encryptPassword(password)
            const created = await this.userDao.createUser({ username, email, password })
            return created
        } catch (err) {
            throw err
        }
    }

    async updateUser(fields) {
        try {
            if (isEmpty(fields.userId)) {
                throw new Error(`Bad Request`)
            }
            if (fields.password && !isEmpty(fields.password)) {
                fields.password = await this._encryptPassword(fields.password)
            }
            const updated = await this.userDao.updateUser(fields)
            return updated
        } catch (err) {
            throw err
        }
    }

    async deleteUser(userId) {
        try {
            if (isEmpty(userId)) {
                throw new Error(`Bad Request`)
            }
            const deleted = await this.userDao.deleteUser(userId)
            return deleted
        } catch (err) {
            throw err
        }
    }

    async login({ username, email, password }) {
        
    }

    async authenticate({ email, username, password }) {
        if (!isEmpty(email)) {

        } else {

        }
    }

    async _encryptPassword(password) {
        try {
            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            return bcrypt.hash(password, salt)
        } catch (err) {
            throw err
        }
    }

}

module.exports = UserService