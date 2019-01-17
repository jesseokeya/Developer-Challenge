const { isEmpty } = require('lodash')
const jwtDecode = require('jwt-decode')

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
    handleAuth({ ctx }) {
        // this._validateAuthHeader(ctx)
    }

    async _validateAuthHeader(ctx) {
        const header = ctx.request.header
        const token = header['authorization']
        if (!isEmpty(token)) {
            try {
                const decoded = jwtDecode(token)
                const validateToken = decoded.issuer === 'marketplace.api.internal' && decoded.aud === 'marketplace.client'
                if ((Date.now() / 1000 > decoded.exp) && validateToken) {
                    throw new Error('Invalid Auth Token')
                }
            } catch (err) {
                if (err.message.includes('Invalid token specified')) {
                    throw new Error('Invalid Auth Token')
                } else { 
                    throw err 
                }
            }
        } else {
            ctx.status = 400
            throw new Error('Unauthorized')
        }
    }

}

module.exports = MiddlewareService