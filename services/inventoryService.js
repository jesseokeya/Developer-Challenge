class InventoryService {
    constructor({ inventoryDao }) {
        this.inventoryDao = inventoryDao
    }
}

module.exports = InventoryService