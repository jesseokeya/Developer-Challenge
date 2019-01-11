require('dotenv').config()

const Koa = require('koa')
const logger = require('koa-logger')
const json = require('koa-json')
const cors = require('koa2-cors')
const yaml = require('yamljs')
const bodyParser = require('koa-bodyparser')
const koaSwagger = require('koa2-swagger-ui')
const { ApolloServer } = require('apollo-server-koa')
const { MemcachedCache } = require('apollo-server-cache-memcached');
const { version, mongoURI, favicon } = require('./config')

/* Register Monggose Models */
require('./models/cartModel')
require('./models/productModel')
require('./models/userModel')
require('./models/inventoryModel')

const routes = require('./routes')
const { schema } = require('./schema')

const port = process.env.PORT || 8080
const environment = process.env.NODE_ENV || 'Production'

const app = new Koa()

routes(app)

app.use(logger())
app.use(cors())

app.use(json())
app.use(bodyParser())

app.use(koaSwagger({
  routePrefix: `/`,
  supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
  docExpansion: 'none',
  swaggerOptions: { url: yaml.load('./api-docs.yml') },
  title: 'Developer Challenge',
  favicon16: favicon,
  favicon32: favicon,
  hideTopbar: true
}))

const server = new ApolloServer({
  schema,
  persistedQueries: {
    cache: new MemcachedCache(
      ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
      { retries: 10, retry: 10000 }, // Options
    ),
  },
  context: ({ req }) => ({
		authScope: getScope(req.headers.authorization)
	})
})

server.applyMiddleware({ app })

app.listen({ port }, () =>
  console.log(`🚀  ${environment} server ready at http://localhost:${port}${server.graphqlPath}`),
)