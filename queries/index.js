const { isEmpty } = require('lodash')
const jwtDecode = require('jwt-decode')

/* Data access objects */
const { UserDao, ProductDao, InventoryDao, CartDao } = require('../dao')

/* Services */
const { UserService, ProductService, InventoryService, CartService } = require('../services')

/* Initialize data access objects */
const inventoryDao = new InventoryDao()
const userDao = new UserDao()
const productDao = new ProductDao()
const cartDao = new CartDao()

/* Initialize services */
const inventoryService = new InventoryService({ inventoryDao })
const cartService = new CartService({ cartDao })
const userService = new UserService({ userDao })
const productService = new ProductService({ productDao, inventoryService, cartService })

module.exports = {
    /* Query Schema */
    Query: {
        /* retrieves all products */
        products: _ => productService.getProducts(),
         /* retrieves a particular product by productId */
        product: (_, { productId }) => productService.getProduct(productId),
        /* retrieves all users */
        users: _ => userService.getUsers(),
        /* retrieves a particular user by userId */
        user: (_, { userId }) => userService.getUser(userId),
        /* retrieves all inventories */
        inventories: _ => inventoryService.getInventories(),
        /* retrieves a particular inventory by inventoryId */
        inventory: (_, { inventoryId }) => inventoryService.getInventory(inventoryId),
        /* retrieves all carts */
        carts: _ => cartService.getCarts(),
        /* retrieves a particular cart by cartId */
        cart: (_, { cartId }) => cartService.getCart(cartId)
    },
    /* User Schema */
    User: {
        /* retrieves a particular merchant user's product inventory */
        inventory: ({ _id }) => inventoryService.getInventoryByUser(_id),
        /* retrieves carts associated with a particular user */
        carts: ({ _id }) => cartService.getCartByUser(_id)
    },
    /* Inventory Schema */
    Inventory: {
        /* retrieves all products associated with a particular inventory */
        products({ products }) {
            products = Promise.all(
                products.map(productId => productService.getProduct(productId))
            )
            return products
        }
    },
     /* Cart Schema */
    Cart: {
        /* retrieves product with a particular cart */
        products: ({ userId }) => productService.getProductsByUser(userId),
        /* retrieves inventory where the cart product exists in */
        inventory: ({ inventoryId }) => inventoryService.getInventory(inventoryId)
    },
    /* Store Schema */
    Store: {
        /* retrieves user associated with a merchant's inventory store */
        user: ({ userId }) => userService.getUser(userId)
    },
    /* Product Schema */
    Product: {
        /* retrieves user associated with a particular product */
        async user({ _id }) {
            const inventory = await inventoryService.getByProduct(_id)
            const user = !isEmpty(inventory) ? await userService.getUser(inventory.store.userId) : null
            return user
        },
        /* retrieves user associated with a particular product */
        inventory: ({ _id }) => inventoryService.getByProduct(_id)
    },
    /* Auth Schema */
    Auth: {
        /* authetheticates user returning a jwt token and user schema */
        user({ token }) {
            const decoded = jwtDecode(token)
            if (!(Date.now() / 1000 > decoded.exp)) {
                return userService.getUser(decoded._id)
            }
        }
    }
}