const { isEmpty } = require('lodash')

/** 
 * Class representing a cartService
 */
class CartService {
    /**
     * Initalize class
     * @param {Object} options - { cartDao, productService, userService, inventoryService }
     */
    constructor({ cartDao, productService, userService, inventoryService }) {
        this.cartDao = cartDao
        this.productService = productService
        this.userService = userService
        this.inventoryService = inventoryService
    }

    /**
     * creates a new cart
     * @param {Object} params - { userId, productId }
     * @return {Object} A new cart object
     * @throws {Error}
     */
    async createCart({ userId, products }) {
        try {
            if (isEmpty(userId)) {
                throw new Error('Bad Request')
            }
            /* checks if user exists in the database */
            const user = await this.userService.getUser(userId)
            if (isEmpty(user)) {
                throw new Error('Only registered users are allowed to create carts')
            }
            products.forEach(async productId => {
                /* checks if a particular product exists in the database */
                const product = await this.productService.getProduct(productId)
                if (isEmpty(product)) {
                    throw new Error(`Product with id ${productId} doesnt exists in the database`)
                }
                /* checks if a particular product is in stock based on the inventory_count */
                if (product.inventory_count <= 0) {
                    throw new Error('Not enough product instock')
                }
            });
            const created = await this.cartDao.createCart({ userId, products })
            return created
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves all carts from mongo
     * @return {[Object]} An array of cart objects
     * @throws {Error}
     */
    async getCarts() {
        try {
            const carts = await this.cartDao.getCarts()
            return carts
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves all products in a cart
     * @param {String} cartId - cart unique identification
     * @return {[Object]} An array of product objects
     * @throws {Error}
     */
    async getProducts(cartId) {
        try {
            if (isEmpty(cartId)) {
                throw new Error('Bad Request')
            }
            const cart = await this.getCart(cartId)
            let products = cart.products
            products = await Promise.all(products.map(productId => this.productService.getProduct(productId)))
            return products
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves a cart by cartId
     * @param {String} cartId - cart unique identification
     * @return {Object} cart object
     * @throws {Error}
     */
    async getCart(cartId) {
        try {
            if (isEmpty(cartId)) {
                throw new Error('Bad Request')
            }
            const cart = await this.cartDao.getCart(cartId)
            return cart
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves a cart by associated userId
     * @param {String} userId - user unique identification
     * @return {Object} cart object
     * @throws {Error}
     */
    async getCartByUser(userId) {
        try {
            if (isEmpty(userId)) {
                throw new Error('Bad Request')
            }
            const cart = await this.cartDao.getCartByUser(userId)
            return cart
        } catch (err) {
            throw err
        }
    }

    /**
     * Adds a product to cart
     * @param {Object} params - { cartId, productId }
     * @return {Object} cart object
     * @throws {Error}
     */
    async addCartProducts(args) {
        try {
            if (isEmpty(args.cartId)) {
                throw new Error(`Bad Request`)
            }
            const products = args.products
            const prevCart = await this.getCart(args.cartId)
            const cart = await this.updateCart({ cartId: args.cartId, products: [...prevCart.products, ...products] })
            return cart
        } catch (err) {
            throw err
        }
    }

    /**
     * Updates a cart by specified fields
     * @param {Object} fields - field(s) to be updated
     * @return {Object} updated cart object
     * @throws {Error}
     */
    async updateCart(fields) {
        try {
            if (isEmpty(fields.cartId)) {
                throw new Error(`Bad Request`)
            }
            const updated = await this.cartDao.updateCart(fields)
            return updated
        } catch (err) {
            throw err
        }
    }

    /**
     * Deletes a cart by cartId
     * @param {String} cartId - cart unique identification
     * @return {Object} deleted cart object
     * @throws {Error}
     */
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

    /**
     * Purcahes / checksout products in cart and empties cart
     * @param {Object} params - {cartId, userId }
     * @return {Object} an array of products purchased
     * @throws {Error}
     */
    async checkout(args) {
        try {
            const cartId = args.cartId
            if (isEmpty(cartId)) {
                throw new Error('Bad Request')
            }
            let cart = await this.getCart(cartId)
            const products = await cart.products
            products.forEach(async productId => {
                let product = await this.productService.getProduct(productId)
                product = await this.productService.updateProduct({ 
                    productId, inventory_count: product.inventory_count - 1 
                })
            })
            cart = await this.getCart(cartId)
            return cart
        } catch (err) {
            throw err
        }
    }
}

module.exports = CartService