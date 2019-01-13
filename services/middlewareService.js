const { isEmpty } = require('lodash')

/** 
 * Class representing the middleware service
 */
class MiddlewareService {
    /**
     * Initalize class
     * @param {Object} options - class options (defaults to an empty object if no options are passed in)
     */
    constructor(options = {}) {
        this.options = options
    }

    /**
     * checks if authorization token is valid
     * @throws {Error} - 4xx Error Unauthorized
     */
    handleAuth({ ctx: { request } }) {
        console.log(request)
        const header = request.header
        if (isEmpty(header.authorization)) {
            console.log(header)
            // throw new Error('Unauthorized')
        }
    }
}

module.exports = MiddlewareService