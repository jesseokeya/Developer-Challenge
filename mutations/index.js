/* Data access objects */
const { UserDao } = require('../dao')

/* Services */
const { UserService } = require('../services')

const userService = new UserService({ UserDao })

module.exports = {
    Mutation: {
        createUser: (_, { username, email, password }) => {
            return userService.createUser({ username, email, password })
        },

        createProduct: (parent, args) => { },
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