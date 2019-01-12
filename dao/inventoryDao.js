const mongoose = require('mongoose')
const Inventory = mongoose.model('Inventory')

class InventoryDao {
    constructor(options = {}) {
        this.options = options
    }

    async createInventory({ store: { name, userId }, products }) {
        let newInventory = new Inventory({ store: { name, userId }, products })
        newInventory = newInventory.save()
        return newInventory
    }

    async getInventory() { 
        return Inventory.find() 
    }

    async getInventory(inventoryId) { 
        return Inventory.findById(inventoryId) 
    }

    async updateInventory(fields) {
        const _id = fields.inventoryId
        return Inventory.findOneAndUpdate({ _id }, { $set: fields }, { new: true })
    }

    async deleteInventory(inventoryId) {
        return Inventory.findOneAndDelete({ _id: inventoryId })
    }
}

module.exports = InventoryDao