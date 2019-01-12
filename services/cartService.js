const { isEmpty } = require('lodash')

class CartService {
    constructor({ cartDao }) {
        this.cartDao = cartDao
    }

    async createCart({ userId, productId, inventoryId }) {
        try {
            if (isEmpty(userId) || isEmpty(productId) || isEmpty(inventoryId)) {
                throw new Error('Bad Request')
            }
            const created = await this.cartDao.createCart({ userId, productId, inventoryId })
            return created
        } catch (err) {
            throw err
        }
    }

    async getCarts() {
        try {
            const carts = await this.cartDao.getCarts()
            return carts
        } catch (err) {
            throw err
        }
    }

    async getCart(cartId) {
        try {
            if (isEmpty(cartId)) {
                throw new Error('Bad Request')
            }
            const cart = await this.cartDao.getUser(cartId)
            return cart
        } catch (err) {
            throw err
        }
    }

    async updateCart(fields) {
        try {
            if (isEmpty(fields.inventoryId)) {
                throw new Error(`Bad Request`)
            }
            const updated = await this.cartDao.updateCart(fields)
            return updated
        } catch (err) {
            throw err
        }
    }

    async deleteCart(cartId) {
        try {
            if (isEmpty(cartId)) {
                throw new Error('Bad Request')
            }
            const deleted = await this.cartDao.deleteCart(cartId)
            return deleted
        } catch (err) {
            throw err
        }
    }
}

module.exports = CartService