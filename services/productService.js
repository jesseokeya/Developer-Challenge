const { isEmpty } = require('lodash')

/** 
 * Class representing a productService
 */
class ProductService {
    /**
     * Initalize class
     * @param {Object} options - { productDao, inventoryService, userService }
     */
    constructor({ productDao, inventoryService, userService, cartService }) {
        this.productDao = productDao
        this.inventoryService = inventoryService
        this.userService = userService
        this.cartService = cartService
    }

    /**
     * creates a new product
     * @param {Object} params - { userId, title, price, inventory_count }
     * @return {Object} A new product object
     * @throws {Error}
     */
    async createProduct({ userId, title, price, inventory_count }) {
        if (isEmpty(userId) || isEmpty(title) || isEmpty(price.toString()) || isEmpty(inventory_count.toString())) {
            throw new Error('Bad Request')
        }
        /* checks if user exists */
        const user = await this.userService.getUser(userId)
        if (isEmpty(user)) {
            throw new Error('only registered users are allowed to create products')
        }
        /* creates an new product */
        const created = await this.productDao.createProduct({ title, price, inventory_count })
        if (user.role === 'merchant') {
            /* checks if user is associated with an inventory */
            const inventory = await this.inventoryService.getInventoryByUser(userId)
            if (!isEmpty(inventory)) {
                /* updates the inventory to add the newly created product */
                await this.inventoryService.updateInventory({
                    inventoryId: inventory._id,
                    products: [...inventory.products, created._id]
                })
            } else {
                /* creates a new inventory and associates procduct(s) to it */
                await this.inventoryService.createInventory({
                    storeName: `${user.username}'s store`,
                    userId,
                    products: [created.id]
                })
            }
        }
        return created
    }

    /**
     * Retrieves all products from mongo
     * @return {[Object]} An array of product objects
     * @throws {Error}
     */
    async getProducts() {
        try {
            const products = await this.productDao.getProducts()
            return products
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves a particular product by productId
     * @param {String} productId - product unique identification
     * @return {Object} product object
     * @throws {Error}
     */
    async getProduct(productId) {
        try {
            if (isEmpty(productId)) {
                throw new Error('Bad Request')
            }
            const product = await this.productDao.getProduct(productId)
            return product
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieve a particular product by productId
     * @param {String} productId - product unique identification
     * @return {Object} product object
     * @throws {Error}
     */
    async getProductsByUser(userId) {
        try {
            if (isEmpty(userId)) {
                throw new Error('Bad Request') 
            }
            const carts = await this.cartService.getCartByUser(userId)
            const products = await Promise.all(carts.map(product => this.getProduct(product.productId)))
            return products
        } catch (err) {
            throw err
        }
    }

    /**
     * Updates a product by specified fields
     * @param {Object} fields - field(s) to be updated
     * @return {Object} updated product object
     * @throws {Error}
     */
    async updateProduct(fields) {
        try {
            if (isEmpty(fields.productId)) {
                throw new Error('Bad Request')
            }
            const updated = await this.productDao.updateProduct(fields)
            return updated
        } catch (err) {
            throw err
        }
    }

    /**
     * Deletes a product by productId
     * @param {String} productId - product unique identification
     * @return {Object} deleted product object
     * @throws {Error}
     */
    async deleteProduct(productId) {
        try {
            if (isEmpty(productId)) {
                throw new Error('Bad Request')
            }
            const deleted = await this.productDao.deleteProduct(productId)
            return deleted
        } catch (err) {
            throw err
        }
    }
}

module.exports = ProductService