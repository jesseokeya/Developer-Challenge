const mongoose = require('mongoose')
const Cart = mongoose.model('Cart')

/** 
 * Class representing the cart data access object 
 */
class CartDao {
    /**
     * Initalize class
     * @param {Object} options - class options (defaults to an empty object if no options are passed in)
     */
    constructor(options = {}) {
        this.options = options
    }

    /**
     * Creates a new Cart
     * @param {Object} params - { userId, productId, inventoryId }
     * @returns {Object} - new cart
     */
    async createCart({ userId, productId, inventoryId }) {
        let newCart = new Cart({ userId, productId, inventoryId })
        newCart = newCart.save()
        return newCart
    }

    /**
     * Gets all carts from mongo database
     * @returns {[Object]} - array of carts objects
     */
    async getCarts() {
        return Cart.find()
    }

    /**
     * Gets a particular cart by Id
     * @param {String} cartId - unique identification
     * @returns {Object} - cart object
     */
    async getCart(cartId) {
        return Cart.findById(cartId)
    }

    /**
     * Gets a particular cart by Id
     * @param {String} userId - user unique identification
     * @returns {Object} - cart object
     */
    async getCartByUser(userId) {
        return Cart.find({ userId })
    }

    /**
     * Updates an exisiting cart 
     * @param {Object} fields - fields to be updated
     * @returns {Object} - cart object
     */
    async updateCart(fields) {
        const _id = fields.cartId
        return Cart.findOneAndUpdate({ _id }, { $set: fields }, { new: true })
    }

    /**
     * Deletes a particular cart by Id
     * @param {String} cartId - unique identification
     * @returns {Object} - cart object
     */
    async deleteCart(cartId) {
        return Cart.findOneAndDelete({ _id: cartId })
    }
}

module.exports = CartDao