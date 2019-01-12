/* Data access objects */
const { UserDao } = require('../dao')

/* Services */
const { UserService } = require('../services')

const userService = new UserService({ UserDao })

module.exports = {
    Query: {
        products: (parent, args) => { },
        product: (parent, args) => { },
        users: _ => { return userService.getUsers() },
        user: (parent, args) => { },
        inventories: (parent, args) => { },
        inventory: (parent, args) => { },
        carts: (parent, args) => { },
        cart: (parent, args) => { }
    }
}