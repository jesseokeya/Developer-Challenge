const { gql } = require('apollo-server-koa')

const typeDefs = gql`
  type Product {
    _id: ID!
    title: String!
    price: Int
    inventory_count: Int
    user: User
  }

  type Auth {
    token: String!
  }

  type Inventory {
    _id: ID!
    store: Store
    products: [Product]
  }

  type Cart {
    _id: ID!
    user: User
    product: Product
    inventory: Inventory
  }

  type User {
    _id: ID!
    role: String
    username: String!
    email: String!
    password: String!
    inventory: Inventory
    cart: Cart
  }

  type Store {
    _id: ID!
    name: String!
    userID: ID!
  }

  type Query {
    products: [Product]
    product(productId: ID!): Product
    users: [User]
    user(userId: ID!): User
    inventories: [Inventory]
    inventory(inventoryId: ID!): Inventory
    carts: [Cart]
    cart(cartId: ID!): Cart
  }

  type Mutation {
    createUser(username: String!, password: String!, email: String): User,
    login(email: String, username: String, password: String!): Auth,
    createProduct(userId: ID!, title: String!, price: Int!, inventory_count: Int!): Product,
    createCart(userId: ID!, productId: ID!): Cart,
    createInventory(storeName: String, userId: ID!, products: [ID]): Inventory,
    updateUser(userId: ID!, username: String, password: String, email: String, role: String): User,
    updateCart(productId: ID!, inventoryId: ID!): Cart,
    updateProduct(productId: ID!, title: String, price: Int, inventory_count: Int): Product,
    updateInventory(storeName: String, userId: ID!, products: [ID]): Inventory,
    deleteCart(cartId: ID!): Cart,
    deleteUser(userId: ID!): User,
    deleteProduct(productId: ID!): Product,
    deleteInventory(inventoryId: ID!): Inventory
  }
`;


module.exports = typeDefs