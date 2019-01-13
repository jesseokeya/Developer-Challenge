/* Data access objects */
const { UserDao, ProductDao, InventoryDao, CartDao } = require('../dao')

/* Services */
const { UserService, ProductService, InventoryService, CartService } = require('../services')

/* Initialize data access objects */
const inventoryDao = new InventoryDao()
const userDao = new UserDao()
const cartDao = new CartDao()
const productDao = new ProductDao()

/* Initialize services */
const inventoryService = new InventoryService({ inventoryDao })
const userService = new UserService({ userDao })
const productService = new ProductService({ productDao, inventoryService, userService })
const cartService = new CartService({ cartDao, productService, userService, inventoryService })

module.exports = {
    Mutation: {
        createUser: (_, args) => {
            return userService.createUser(args)
        },
        createProduct: (_, args) => { 
            return productService.createProduct(args)
        },
        createCart: (_, args) => { 
            return cartService.createCart(args)
        },
        createInventory: (_, args) => { 
            return inventoryService.createInventory(args)
        },
        updateUser: (_, args) => {
            return userService.updateUser(args)
        },
        updateProduct: (_, args) => { 
            return productService.updateProduct(args)
        },
        updateInventory: (_, args) => { 
            return inventoryService.updateInventory(args)
        },
        updateCart: (_, args) => { 
            return cartService.updateCart(args)
        },
        deleteUser: (_, { userId }) => {
            return userService.deleteUser(userId)
        },
        deleteProduct: (_, { productId }) => { 
            return productService.deleteProduct(productId)
        },
        deleteInventory: (_, { inventoryId }) => { 
            return inventoryService.deleteInventory(inventoryId)
        },
        deleteCart: (_, { cartId }) => { 
            return cartService.deleteCart(cartId)
        },
        login: (_, args) => { 
            return userService.login(args)
        }
    }
}