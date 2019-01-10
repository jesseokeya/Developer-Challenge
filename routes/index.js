
module.exports = (app) => {
    const handlers = []
    handlers.forEach(handler => {
        handler.init(app)
    })
}