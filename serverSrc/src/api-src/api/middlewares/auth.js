const Promise = require('bluebird');
const passport = require('passport');
const AuthenticationError = require('../utils/AuthenticationError');

const handleJWT = (req, res, next, onlyAdmin) => async (err, user, info) => {
    const error = err || info;
    const logIn = Promise.promisify(req.logIn);
    const authError = new AuthenticationError({
        message: error ? error.message : 'Unauthorized',
        stack: error ? error.stack : undefined
    });

    try {
        if (error || !user ||
            (!onlyAdmin && user.admin) ||
            (onlyAdmin && !user.admin)) {
            throw authError;
        }

        await logIn(user, { session: false });
    } catch (e) {
        return next(authError);
    }

    req.user = user;

    return next();
};

exports.authorize = (req, res, next) => passport.authenticate('jwt',
    { session: false }, handleJWT(req, res, next))(req, res, next);
