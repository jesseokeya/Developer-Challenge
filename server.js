require('dotenv').config()

const Koa = require('koa')
const logger = require('koa-logger')
const json = require('koa-json')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const koaSwagger = require('koa2-swagger-ui')
const { ApolloServer } = require('apollo-server-koa')
const { version, mongoURI, favicon } = require('./config')

const routes = require('./routes')
const { schema } = require('./schema');

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
    swaggerOptions: { url: `http://petstore.swagger.io/v2/swagger.json` }, 
    title: 'Developer Challenge',
    favicon16: favicon,
    favicon32: favicon,
    hideTopbar: true
}))

const server = new ApolloServer({ 
    schema,
    context: ({ req }) => ({
		authScope: getScope(req.headers.authorization)
	}),
})

server.applyMiddleware({ app })

app.listen({ port }, () =>
  console.log(`🚀  ${environment} server ready at http://localhost:${port}${server.graphqlPath}`),
)