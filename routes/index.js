const Router = require('koa-router');
const router = new Router()

const UserDao = require('../dao/userDao')
const UserService = require('../services/userService')

const userService = new UserService({ userDao: new UserDao() })

router.post('/api/login', async ctx => {
    try {
        const body = ctx.request.body
        const token = await userService.login(body)
        ctx.body = { ...token }
    } catch (err) {
        throw err
    }
});

router.post('/api/signup', async ctx => {
    try {
        const body = ctx.request.body
        const created = await userService.createUser(body)
        const token = await userService.login({ email: created.email, password: body.password })
        ctx.body = { ...token }
    } catch (err) {
        throw err
    }
});

module.exports = router