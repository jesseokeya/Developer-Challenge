const { makeExecutableSchema } = require('apollo-server');
const { gql } = require('apollo-server-koa')

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = { schema }

