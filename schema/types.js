const { gql } = require('apollo-server-koa')

const typeDefs = gql`
  type Product {
    title: String!
    price: Int
    inventory_count: Int
  }

  type Auth {
    token: String!
  }

  type User {
    _id: ID!
    role: String
    username: String!
    email: String!
    password: String!
  }

  type Inventory {
    store: Store
    products: [Product]
  }

  type Cart {
    user: User
    product: Product
    inventory: Inventory
  }

  type Store {
    name: String!
    userID: ID!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    users: [User]
    user(id: ID!): User
    inventories: [Inventory]
    inventory(id: ID!): Inventory
    carts: [Cart]
    cart(id: ID!): Cart
  }

  type Mutation {
    createUser(username: String!, password: String!, email: String): User,
    login(email: String, username: String, password: String!): Auth,
    createProduct(title: String!, price: Int!, inventory_count: Int!): Product,
    createCart(userId: ID!, productId: ID!, inventoryId: ID!): Cart,
    createInventory(storeName: String!, userId: ID!, products: [ID]): Inventory,
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