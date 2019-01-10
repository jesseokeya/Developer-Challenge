const { gql } = require('apollo-server-koa')

const typeDefs = gql`
  type Todo {
    id: String!
    text: String!
    completed: Boolean!
  }

  type TodoList {
    todos: [Todo]
  }

  type Query {
    todoList: TodoList
  }

  type Mutation {
    addTodo(
      text: String!
    ): Todo,
    toggleTodo(
      id: String!
    ): Todo
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs