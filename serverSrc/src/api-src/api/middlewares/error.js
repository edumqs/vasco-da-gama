const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const AuthenticationError = require('../utils/AuthenticationError');
const { env } = require('../../../vars');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const finalHandler = (err, req, res) => {
    const response = {
        code: err.status,
        message: err.message || httpStatus[err.status],
        errors: err.errors,
        stack: err.stack
    };

    if (env !== 'development') {
        delete response.stack;
    }

    res.status(err.status || 500);
    res.send(response);
    res.end();
};

/**
 * If error is not an instanceOf APIError, convert it.
 *
 * Error types:
 * validation error - when input is not valid;
 * standard error - when there's a problem in the endpoint
 * field error - used for forms, when for example one field is not valid
 *
 * @public
 */
exports.errorHandler = (err, req, res, next) => {
    let convertedError = err;

    if (!(err instanceof AuthenticationError) && !(err instanceof APIError)) {
        convertedError = new APIError({
            message: err.message,
            status: err.status,
            stack: err.stack
        });
    }

    finalHandler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
    const error = new APIError({
        message: 'Endpoint not found',
        status: httpStatus.NOT_FOUND
    });
    finalHandler(error, req, res);
};
