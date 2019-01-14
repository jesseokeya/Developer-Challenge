const Router = require('koa-router');
const router = new Router()

router.post('/api/login', (ctx, next) => {
    // ctx.router available
    ctx.body = 'ddd'
});

router.post('/api/signup', (ctx, next) => {
    // ctx.router available
    ctx.body = 'woow'
});

module.exports = router