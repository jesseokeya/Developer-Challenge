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