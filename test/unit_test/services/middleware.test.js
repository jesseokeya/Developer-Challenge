const Middleware = require('../../../services/middlewareService')

const middleware = new Middleware()

test('should be an object', () => expect(typeof middleware).toEqual('object'))