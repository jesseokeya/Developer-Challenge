require('dotenv').config()

/* Register Monggose Models */
require('./models/cartModel')
require('./models/productModel')
require('./models/userModel')
require('./models/inventoryModel')

const Koa = require('koa')
const mongoose = require('mongoose')
const logger = require('koa-logger')
const json = require('koa-json')
const cors = require('koa2-cors')

const bodyParser = require('koa-bodyparser')
const { ApolloServer } = require('apollo-server-koa')

const { schema } = require('./schema')

const port = process.env.PORT || 8080
const environment = process.env.NODE_ENV || 'Production'

mongoose.connect(process.env.MONGO_URI, {  useCreateIndex: true, useNewUrlParser: true })
mongoose.Promise = global.Promise;

const app = new Koa()

app.use(logger())
app.use(cors())

app.use(json())
app.use(bodyParser())

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
		// console.log(req)
	}
})

server.applyMiddleware({ app })

app.use(({ response })=> {
  if (response.status === 404) {
    response.redirect('/graphql')
  }
})

const message = `🚀  ${environment} server ready at http://localhost:${port}${server.graphqlPath}`
app.listen({ port }, _ => console.log(message))