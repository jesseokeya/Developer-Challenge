const mongoose = require('mongoose')
const Product = mongoose.model('Product')

class ProductDao {
    constructor(options = {}) {
        this.options = options
    }

    async createProduct({ title, price, inventory_count }) {}

    async getProducts() { return Product.find() }

    async getProduct(productId) { return Product.findById(productId) }

    async updateProduct(fields) {}

    async deleteProduct(productId) {}
}

module.exports = ProductDao