const mongoose = require('mongoose')
const Product = mongoose.model('Product')

/** 
 * Class representing the product data access object 
 */
class ProductDao {
    /**
     * Initalize class
     * @param {Object} options - class options (defaults to an empty object if no options are passed in)
     */
    constructor(options = {}) {
        this.options = options
    }

    /**
     * Creates a new Product
     * @param {Object} params - { title, price, inventory_count }
     * @returns {Object} - new Product
     */
    async createProduct({ title, price, inventory_count }) {
        let newProduct = new Product({ title, price, inventory_count })
        newProduct = newProduct.save()
        return newProduct
    }

    /**
     * Gets all products from mongo database
     * @returns {[Object]} - array of product objects
     */
    async getProducts() {
        return Product.find()
    }

    /**
     * Gets a particular product by Id
     * @param {String} productId - unique identification
     * @returns {Object} - product object
     */
    async getProduct(productId) {
        return Product.findById(productId)
    }

    /**
     * Updates an exisiting product
     * @param {Object} fields - fields to be updated
     * @returns {Object} - product object
     */
    async updateProduct(fields) {
        const _id = fields.productId
        return Product.findOneAndUpdate({ _id }, { $set: fields }, { new: true })
     }

    /**
     * Deletes a particular product by Id
     * @param {String} productId - unique identification
     * @returns {Object} - product object
     */
    async deleteProduct(productId) {
        return Product.findOneAndDelete({ _id: productId })
    }
}

module.exports = ProductDao