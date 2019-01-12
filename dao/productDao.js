const mongoose = require('mongoose')
const Product = mongoose.model('Product')

class ProductDao {
    constructor(options = {}) {
        this.options = options
    }

    async createProduct({ title, price, inventory_count }) {
        let newProduct = new Product({ title, price, inventory_count })
        newProduct = newProduct.save()
        return newProduct
    }

    async getProducts() {
        return Product.find()
    }

    async getProduct(productId) {
        return Product.findById(productId)
    }

    async updateProduct(fields) {
        const _id = fields.productId
        return Product.findOneAndUpdate({ _id }, { $set: fields }, { new: true })
     }

    async deleteProduct(productId) {
        return Product.findOneAndDelete({ _id: productId })
    }
}

module.exports = ProductDao