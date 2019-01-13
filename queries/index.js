const { isEmpty } = require('lodash')
const jwtDecode = require('jwt-decode')

/* Data access objects */
const { UserDao, ProductDao, InventoryDao, CartDao } = require('../dao')

/* Services */
const { UserService, ProductService, InventoryService, CartService } = require('../services')

const inventoryDao = new InventoryDao()
const userDao = new UserDao()
const productDao = new ProductDao()
const cartDao = new CartDao()

const inventoryService = new InventoryService({ inventoryDao })
const cartService = new CartService({ cartDao })
const userService = new UserService({ userDao })
const productService = new ProductService({ productDao, inventoryService })

module.exports = {
    Query: {
        products() {
            return productService.getProducts()
        },
        product(_, { productId }) {
            return productService.getProduct(productId)
        },
        users() {
            return userService.getUsers()
        },
        user(_, { userId }) {
            return userService.getUser(userId)
        },
        inventories() {
            return inventoryService.getInventories()
        },
        inventory(_, { inventoryId }) {
            return inventoryService.getInventory(inventoryId)
        },
        carts() {
            return cartService.getCarts()
        },
        cart(_, { cartId }) {
            return cartService.getCart(cartId)
        }
    },
    User: {
        inventory({ _id }) {
            return inventoryService.getInventoryByUser(_id)
        },
        carts({ _id }) {
            return cartService.getCartByUser(_id)
        }
    },
    Inventory: {
        products({ products }) {
            products = Promise.all(
                products.map(productId => productService.getProduct(productId))
            )
            return products
        },
    },
    Cart: {
        product({ productId }) {
            return productService.getProduct(productId)
        },
        inventory({ inventoryId }) {
            return inventoryService.getInventory(inventoryId)
        }
    },
    Store: {
        user({ userId }) {
            return userService.getUser(userId)
        }
    },
    Product: {
        async user({ _id }) {
            const inventory = await inventoryService.getByProduct(_id)
            const user = !isEmpty(inventory) ? await userService.getUser(inventory.store.userId) : null
            return user
        },
        inventory({ _id }) { 
            return inventoryService.getByProduct(_id)
        }
    },
    Auth: {
        user({ token }) { 
            const decoded = jwtDecode(token)
            if (!(Date.now() / 1000 > decoded.exp)) {
                return userService.getUser(decoded._id)
            }
        }
    }
}