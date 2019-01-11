const mongoose = require('mongoose')
const Inventory = mongoose.model('Inventory')

class InventoryDao {
    constructor(options = {}) {
        this.options = options
    }

    async createInventory({ store: { name, userId }, products }) {}

    async getInventory() { return Inventory.find() }

    async getInventory(inventoryId) { return Inventory.findById(inventoryId) }

    async updateInventory(fields) {}

    async deleteInventory(inventoryId) {}
}

module.exports = InventoryDao