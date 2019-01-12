/* Data access objects */
const { UserDao, ProductDao, InventoryDao, CartDao } = require('../dao')

/* Services */
const { UserService, ProductService, InventoryService, CartService } = require('../services')

const inventoryDao = new InventoryDao()
const inventoryService = new InventoryService({ inventoryDao })

const userService = new UserService({
    userDao: new UserDao()
})

const productService = new ProductService({
    productDao: new ProductDao(),
    inventoryService
})

const cartService = new CartService({ cartDao: new CartDao() })

module.exports = {
    Query: {
        products: _ => {
            return productService.getProducts()
        },

        product: (parent, { productId }) => {
            return productService.getProduct(productId)
        },

        users: _ => {
            return userService.getUsers()
        },

        user: (_, { userId }) => {
            return userService.getUser(userId)
        },

        inventories: _ => {
            return inventoryService.getInventories()
        },

        inventory: (_, { inventoryId }) => {
            return inventoryService.getInventory(inventoryId)
        },

        carts: _ => {
            return cartService.getCarts()
        },

        cart: (_, { cartId }) => {
            return cartService.getCart(cartId)
        }
    }
}