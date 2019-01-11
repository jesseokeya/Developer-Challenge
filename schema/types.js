const { gql } = require('apollo-server-koa')

const typeDefs = gql`
  type Product {
    title: String!
    price: Int
    inventory_count: Int
  }

  type User {
    role: String
    username: String!
    email: String!
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
    createUser(username: String!, password: String!, email: String): User
  }
`;


module.exports = typeDefs