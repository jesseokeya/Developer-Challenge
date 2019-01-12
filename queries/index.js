/* Data access objects */
const { UserDao, ProductDao, InventoryDao, CartDao } = require('../dao')

/* Services */
const { UserService, ProductService, InventoryService, CartService } = require('../services')

const inventoryDao = new InventoryDao()
const userDao = new UserDao()
const productDao = new ProductDao()
const cartDao = new CartDao() 

const inventoryService = new InventoryService({ inventoryDao })
const userService = new UserService({ userDao })
const productService = new ProductService({ productDao, inventoryService })
const cartService = new CartService({ cartDao })

module.exports = {
    Query: {
        products: _ => {
            return productService.getProducts()
        },
        product: (_, { productId }) => {
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