const { makeExecutableSchema } = require('apollo-server');

const typeDefs = require('./types')
const Query = require('../queries')
const Mutation = require('../mutations')

const resolvers = {
    ...Query,
    ...Mutation
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    introspection: true
})

module.exports = { schema }

