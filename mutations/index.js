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
    /* Mutation Schema */
    Mutation: {
        /* creates a new user. user roles coud be either an admin, merchant or customer */
        createUser: (_, args) => userService.createUser(args),
        /* creates a new product which is associated with a merchant's inventory */
        createProduct: (_, args) => productService.createProduct(args),
        /* creates a new cart which is associted with an inventory, product and a user */
        createCart: (_, args) => cartService.createCart(args),
        /* creates a new inventory which is associated with a merchant user */
        createInventory: (_, args) => inventoryService.createInventory(args),
        /* updates a particular user with the params in args */
        updateUser: (_, args) => userService.updateUser(args),
        /* updates a product with the params in args */
        updateProduct: (_, args) => productService.updateProduct(args),
        /* updates an inventory with the params in args */
        updateInventory: (_, args) => inventoryService.updateInventory(args),
        /* updates a particular cart with the params in args */
        updateCart: (_, args) => cartService.updateCart(args),
        /* deletes a particular user by userId */
        deleteUser: (_, { userId }) => userService.deleteUser(userId),
        /* deletes a particular product by productId */
        deleteProduct: (_, { productId }) => productService.deleteProduct(productId),
        /* deletes a particular inventory by inventoryId */
        deleteInventory: (_, { inventoryId }) => inventoryService.deleteInventory(inventoryId),
        /* deletes a particular cart by cartId */
        deleteCart: (_, { cartId }) => cartService.deleteCart(cartId),
        /* validates users credentials and genarates a jwt token */
        login: (_, args) => userService.login(args),
        /* checks out your cart and decrements all product(s) inventoryCount */
        purchase: (_, args) => cartService.purchaseProducts(args)
    }
}