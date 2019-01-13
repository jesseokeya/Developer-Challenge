const mongoose = require('mongoose')
const { isEmpty } = require('lodash')

/** 
 * Class representing a inventoryService
 */
class InventoryService {
    /**
     * Initalize class
     * @param {Object} options - { inventoryDao }
     */
    constructor({ inventoryDao }) {
        this.inventoryDao = inventoryDao
    }

    /**
     * creates a new cart
     * @param {Object} params - { storeName, userId, products }
     * @return {Object} A new inventory object
     * @throws {Error}
     */
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

    /**
     * Retrieves all inventories from mongo
     * @return {[Object]} An array of invenroty objects
     * @throws {Error}
     */
    async getInventories() {
        try {
            const inventories = this.inventoryDao.getInventories()
            return inventories
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves inventory by inventoryId
     * @param {String} inventoryId - inventory unique identification
     * @return {Object} cart object
     * @throws {Error}
     */
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

    /**
     * Retrieves inventory by merchnt's userId
     * @param {String} userId - user unique identification
     * @return {Object} inventory object
     * @throws {Error}
     */
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

    /**
     * Retrieves inventory by productId
     * @param {String} inventoryId - inventory unique identification
     * @return {Object} inventory object
     * @throws {Error}
     */
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

    /**
     * Updates specified inventory field(s)
     * @param {Object} fields - field(s) to be updated
     * @return {Object} inventory object
     * @throws {Error}
     */
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

    /**
     * Deletes a inventory by inventoryId
     * @param {String} inventoryId - inventory unique identification
     * @return {Object} deleted inventory object
     * @throws {Error}
     */
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