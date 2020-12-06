const httpStatus = require('http-status');
const ExtendableError = require('./ExtendableError');

/**
 * Class representing an Authentication error.
 * @extends ExtendableError
 */
class AuthenticationError extends ExtendableError {
    /**
   * Creates an req.user error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
    constructor({
        message,
        errors,
        stack,
        status = httpStatus.UNAUTHORIZED,
        isPublic = true
    }) {
        super({
            message, errors, status, isPublic, stack
        });
    }
}

module.exports = AuthenticationError;
