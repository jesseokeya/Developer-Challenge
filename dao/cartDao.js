const mongoose = require('mongoose')
const Cart = mongoose.model('Cart')

class CartDao {
    constructor(options = {}) {
        this.options = options
    }

    async createCart({ userId, productId, inventoryId }) {
        let newCart = new Cart({ userId, productId, inventoryId })
        newCart = newCart.save()
        return newCart
    }

    async getCart() {
        return Cart.find()
    }

    async getCart(cartId) {
        return Cart.findById(cartId)
    }

    async updateCart(fields) {
        const _id = fields.cartId
        return Cart.findOneAndUpdate({ _id }, { $set: fields }, { new: true })
    }

    async deleteCart(cartId) {
        return Cart.findOneAndDelete({ _id: cartId })
    }
}

module.exports = CartDao