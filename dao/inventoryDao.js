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