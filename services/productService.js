const { isEmpty } = require('lodash')

class ProductService {
    constructor({ productDao, inventoryService }) {
        this.productDao = productDao
        this.inventoryService = inventoryService
    }

    async createProduct({ userId, title, price, inventory_count }) {
        if (isEmpty(userId) || isEmpty(title) || isEmpty(price) || isEmpty(inventory_count)) {
            throw new Error('Bad Request')
        }
        const user = await this.userDao.getUser(userId)
        if (isEmpty(user)) {
            throw new Error('only registered users are allowed to create products')
        }
        const inventory = await this.inventoryService.getInventoryByUser(userId)
        if (!isEmpty(inventory)) {

        }
        const created = await this.productDao.createProduct({ title, price, inventory_count })
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