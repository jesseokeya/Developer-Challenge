const mongoose = require('mongoose')
const Cart = mongoose.model('Cart')

class CartDao {
    constructor(options = {}) {
        this.options = options
    }

    async createCart({ userId, productId, inventoryId }) {}

    async getCart() { return Cart.find() }

    async getCart(cartId) { return Cart.findById(cartId) }

    async updateCart(fields) {}

    async deleteCart(cartId) {}
}

module.exports = CartDao