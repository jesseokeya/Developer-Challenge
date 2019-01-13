const mongoose = require('mongoose')
const { isEmpty } = require('lodash')

class InventoryService {
    constructor({ inventoryDao }) {
        this.inventoryDao = inventoryDao
    }

    async createInventory({ storeName, userId, products }) {
        try {
            if (isEmpty(userId)) {
                throw new Error('Bad Request')
            }
            if (!isEmpty(products) && products.length > 0) {
                products = products.filter(productId => mongoose.Types.ObjectId(productId))
            }
            const created = await this.inventoryDao.createInventory({ store: { name: storeName, userId }, products })
            return created
        } catch (err) {
            throw err
        }
    }

    async getInventories() {
        try {
            const inventories = this.inventoryDao.getInventories()
            return inventories
        } catch (err) {
            throw err
        }
    }

    async getInventory(inventoryId) {
        try {
            if (isEmpty(inventoryId)) {
                throw new Error('Bad Request')
            }
            const inventory = await this.inventoryDao.getInventory(inventoryId)
            return inventory
        } catch (err) {
            throw err
        }
    }

    async getInventoryByUser(userId) {
        try {
            if (isEmpty(userId)) {
                throw new Error('Bad Request')
            }
            const inventory = await this.inventoryDao.getInventoryByUser(userId)
            return inventory

        } catch (err) {
            throw err
        }
    }

    async getByProduct(productId) {
        try {
            if (isEmpty(productId)) {
                throw new Error('Bad Request')
            }
            const inventory = await this.inventoryDao.getInventoryByProduct(productId)
            return inventory

        } catch (err) {
            throw err
        }
    }

    async updateInventory(fields) {
        try {
            if (isEmpty(fields.inventoryId)) {
                throw new Error('Bad Request')
            }
            const updated = await this.inventoryDao.updateInventory(fields)
            return updated
        } catch (err) {
            throw err
        }
    }

    async deleteInventory(inventoryId) {
        try {
            if (isEmpty(inventoryId)) {
                throw new Error('Bad Request')
            }
            const deleted = await this.productDao.deleteInventory(inventoryId)
            return deleted
        } catch (err) {
            throw err
        }
    }
}

module.exports = InventoryService