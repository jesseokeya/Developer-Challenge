const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isEmpty } = require('lodash')

class UserService {
    constructor({ userDao }) {
        this.userDao = userDao
    }
    
    async createUser({ username, email, password }) {
        try {
            if (isEmpty(username) || isEmpty(password)) {
                throw new Error(`Bad Request`)
            }
            email = isEmpty(email) ? email : email.toLowerCase()
            username = username.toLowerCase()
            password = await this._encryptPassword(password)
            const created = await this.userDao.createUser({ username, email, password })
            return created
        } catch (err) {
            throw err
        }
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
        if (isEmpty(password)) {
            throw new Error('Bad Request')
        }
        const auth = await this.authenticate({ email, username, password })
        return auth
    }

    async authenticate({ email, username, password }) {
        try {
            let user = !isEmpty(email)
                ? await this.userDao.getUserByCustomField({ email })
                : await this.userDao.getUserByCustomField({ username })
            if (user.length > 0) {
                const ctx = user[0]
                const encryptedPassword = ctx.password
                const validCredentials = await this._comparePaswords(password, encryptedPassword)
                if (validCredentials) {
                    return this._jwtPayload(ctx)
                } else {
                    throw new Error('Unauthorized')
                }
            } else {
                throw new Error('Unauthorized')
            }
        } catch (err) {
            throw err
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

    async _comparePaswords(password, encryptedPassword) {
        try {
            return bcrypt.compare(password, encryptedPassword)
        } catch (err) {
            throw err
        }
    }

    async _jwtPayload({ _id, email, username, role }) {
        try {
            const token = await jwt.sign({
                _id,
                email,
                username,
                role,
                issuer: 'marketplace.api.internal',
                subType: 'service',
                aud: 'marketplace.client'
            }, process.env.JWT_SECRET, { expiresIn: '1h' })
            return { token }
        } catch (err) {
            throw err
        }
    }

}

module.exports = UserService