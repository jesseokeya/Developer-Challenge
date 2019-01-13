const { isEmpty } = require('lodash')

class ProductService {
    constructor({ productDao, inventoryService, userService }) {
        this.productDao = productDao
        this.inventoryService = inventoryService
        this.userService = userService
    }

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

    async getProducts() {
        try {
            const products = await this.productDao.getProducts()
            return products
        } catch (err) {
            throw err
        }
    }

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