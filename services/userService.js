const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isEmpty } = require('lodash')

/** 
 * Class representing a userService
 */
class UserService {
    /**
     * Initalize class
     * @param {Object} options - { userDao }
     */
    constructor({ userDao, cartService }) {
        this.userDao = userDao
        this.cartService = cartService
    }

    /**
     * creates a new user
     * @param {Object} params - { username, email, password, role }
     * @return {Object} A new user object
     * @throws {Error}
     */
    async createUser({ username, email, password, role }) {
        try {
            if (isEmpty(username) || isEmpty(password)) {
                throw new Error(`Bad Request`)
            }
            email = isEmpty(email) ? email : email.toLowerCase()
            username = username.toLowerCase()
            password = await this._encryptPassword(password)
            role = !isEmpty(role) ? role : 'customer'
            const created = await this.userDao.createUser({ username, email, password, role })
            if (created.role === 'customer') {
                /* create empty cart for new customer */
                await this.cartService.createCart({ userId: created._id, products: [] })
            }
            return created
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves all users from mongo
     * @return {[Object]} An array of user objects
     * @throws {Error}
     */
    async getUsers() {
        try {
            const users = await this.userDao.getUsers()
            return users
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves a particular user by userId
     * @param {String} userId - user unique identification
     * @return {Object} user object
     * @throws {Error}
     */
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

    /**
     * Update a user by specified fields
     * @param {Object} fields - field(s) to be updated
     * @return {Object} updated user object
     * @throws {Error}
     */
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

    /**
     * Deletes a user by userId
     * @param {String} userId - user unique identification
     * @return {Object} deleted user object
     * @throws {Error}
     */
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

    /**
     * Generates an auth token for user authentication
     * @param {Object} params - { username, email, password }
     * @return {Object} { token }
     * @throws {Error}
     */
    async login({ username, email, password }) {
        if (isEmpty(password)) {
            throw new Error('Bad Request')
        }
        username = !isEmpty(username) ? username.toLowerCase() : ''
        email = !isEmpty(email) ? email.toLowerCase() : ''
        const auth = await this.authenticate({ email, username, password })
        return auth
    }

    /**
     * Authenticates user based on parms passed in
     * @param {Object} params - { email, username, password }
     * @return {<Promise>}
     * @throws {Error}
     */
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

    /**
     * Encryptes / converts sting password to hash with a one way hashing algorithm
     * @param {Sting} password - string password
     * @return {String} hashed password
     * @throws {Error}
     */
    async _encryptPassword(password) {
        try {
            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            return bcrypt.hash(password, salt)
        } catch (err) {
            throw err
        }
    }

    /**
     * Compres string to hashed string for validating user password
     * @param {Sting} password - string password
     * @param {Sting} encryptedPassword - hashed password stored in mongo
     * @return {Boolean} 
     * @throws {Error}
     */
    async _comparePaswords(password, encryptedPassword) {
        try {
            return bcrypt.compare(password, encryptedPassword)
        } catch (err) {
            throw err
        }
    }

    /**
     * Creates a jwt token 
     * @param {Object} params - { _id, email, username, role }
     * @return {<Promise>} token
     * @throws {Error}
     */
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