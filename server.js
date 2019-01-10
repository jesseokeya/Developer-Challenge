require('dotenv').config()

const Koa = require('koa')
const logger = require('koa-logger')
const json = require('koa-json')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const koaSwagger = require('koa2-swagger-ui')
const { ApolloServer, gql } = require('apollo-server-koa')
const { version, mongoURI } = require('./config')

const port = process.env.PORT || 3004
const app = new Koa()

app.use(logger())
app.use(cors())

app.use(json())
app.use(bodyParser())

app.use(koaSwagger({ routePrefix: `/`, swaggerOptions: { url: `/v1/openapi` }}))

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
)