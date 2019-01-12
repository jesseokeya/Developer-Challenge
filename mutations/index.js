/* Data access objects */
const { UserDao, ProductDao, InventoryDao, CartDao } = require('../dao')

/* Services */
const { UserService, ProductService, InventoryService, CartService } = require('../services')

const inventoryDao = new InventoryDao()
const userDao = new UserDao()
const cartDao = new CartDao()
const productDao = new ProductDao()

const inventoryService = new InventoryService({ inventoryDao })
const userService = new UserService({ userDao })
const productService = new ProductService({ productDao, inventoryService, userService })
const cartService = new CartService({ cartDao, productService, userService })

module.exports = {
    Mutation: {
        createUser: (_, args) => {
            return userService.createUser(args)
        },
        createProduct: (_, args) => { 
            return productService.createProduct(args)
        },
        createCart: (parent, args) => { },
        createInventory: (parent, args) => { },
        updateUser: (_, args) => {
            return userService.updateUser(args)
        },
        updateProduct: (parent, args) => { },
        updateInventory: (parent, args) => { },
        updateCart: (parent, args) => { },
        deleteUser: (_, { userId }) => {
            return userService.deleteUser(userId)
        },
        deleteProduct: (parent, args) => { },
        deleteInventory: (parent, args) => { },
        deleteCart: (parent, args) => { },
        login: (_, args) => { 
            const password = args.password || ''
            const username = args.username || ''
            const email = args.email || ''
            return userService.login({ password, email, username })
        }
    }
}