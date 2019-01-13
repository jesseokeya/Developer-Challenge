const mongoose = require('mongoose')
const Inventory = mongoose.model('Inventory')

/** 
 * Class representing the inventory data access object 
 */
class InventoryDao {
    /**
     * Initalize class
     * @param {Object} options - class options (defaults to an empty object if no options are passed in)
     */
    constructor(options = {}) {
        this.options = options
    }

    /**
     * Creates a new Inventory
     * @param {Object} params - { store: { name, userId }, products }
     * @returns {Object} - new Inventory
     */
    async createInventory({ store: { name, userId }, products }) {
        let newInventory = new Inventory({ store: { name, userId }, products })
        newInventory = newInventory.save()
        return newInventory
    }

    /**
     * Gets all inventory from mongo database
     * @returns {[Object]} - array of inventory objects
     */
    async getInventories() { 
        return Inventory.find() 
    }

    /**
     * Gets a particular inventory by Id
     * @param {String} inventoryId - unique identification
     * @returns {Object} - inventory object
     */
    async getInventory(inventoryId) { 
        return Inventory.findById(inventoryId) 
    }

    /**
     * Gets a particular inventory by userId
     * @param {String} userId - users unique identification
     * @returns {[Object]} - array of inventory object(s)
     */
    async getInventoryByUser(userId) {
        const inventories = await Inventory.find() 
        const inventory = inventories.filter(inventory => inventory.store.userId.toString() === userId.toString())
        return inventory.length > 0 ? inventory[0] : {}
    }

    /**
     * Gets a particular inventory by productId
     * @param {String} productId - product unique identification
     * @returns {[Object]} - array of inventory object(s)
     */
    async getInventoryByProduct(productId) {
        const inventory = await Inventory.find({ products: productId })
        return inventory.length > 0 ? inventory[0] : {}
    }

    /**
     * Updates an exisiting inventory
     * @param {Object} fields - fields to be updated
     * @returns {Object} - inventory object
     */
    async updateInventory(fields) {
        const _id = fields.inventoryId
        return Inventory.findOneAndUpdate({ _id }, { $set: fields }, { new: true })
    }

    /**
     * Deletes a particular inventory by Id
     * @param {String} inventoryId - unique identification
     * @returns {Object} - inventory object
     */
    async deleteInventory(inventoryId) {
        return Inventory.findOneAndDelete({ _id: inventoryId })
    }
}

module.exports = InventoryDao