const httpStatus = require('http-status');
const bCrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const jwt = require('jwt-simple');
const moment = require('moment-timezone');

const { jwtSecret } = require('../../../vars');
const AuthenticationError = require('../utils/AuthenticationError');
const { jwtExpirationInterval, blackListedEmailDomains } = require('../../../vars');
const models = require('../../../database/index');

const isEmailBlacklisted = (email) => {
    for (let i = 0; i < blackListedEmailDomains.length; i++) {
        if (email.indexOf(blackListedEmailDomains[i]) !== -1) return true;
    }
    return false;
};

const isPasswordValid = (userpass, password) => bCrypt.compareSync(password, userpass);

const generateHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

//
/**
 * Generate a user access token object
 * @private
 * @param {integer} userId
 * @param {boolean} isAdmin
 * @returns {AccessToken}
 */
const generateUserAccessToken = (userId, isAdmin) => {
    const expiresIn = moment().add(isAdmin ? 240 : jwtExpirationInterval, 'minutes');

    const payload = {
        exp: expiresIn.unix(),
        iat: moment().unix(),
        sub: userId
    };

    if (isAdmin) {
        payload.admin = true;
    }

    return {
        tokenType: 'Bearer',
        accessToken: jwt.encode(payload, jwtSecret),
        expiresIn
    };
};

/**
 * Generate a refresh token object and saves it into the database
 * @private
 * @param {User} user
 * @returns {RefreshToken}
 */
const generateRefreshToken = async (user) => {
    const { userId } = user;
    const userEmail = user.email;
    const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment().add(30, 'days').toDate();

    const refreshToken = await models.refresh_token.create({
        token, userId, expires, userEmail
    });

    return refreshToken;
};

/**
 * Deletes a refresh token from the database
 * @private
 * @param {String} refreshTokenStr
 */
const deleteRefreshToken = async (refreshTokenStr) => {
    if (!refreshTokenStr) {
        return;
    }
    const refreshToken = await models.refresh_token.find({ where: { token: refreshTokenStr } });
    if (refreshToken) {
        await refreshToken.destroy();
    }
};

/**
 * Returns a formatted object with access and refresh tokens
 * @private
 * @param {models.user} user
 * @return { accessToken, refreshToken }
 */
const generateTokenResponse = async (user) => {
    const accessToken = generateUserAccessToken(user.userId);
    const refreshToken = await generateRefreshToken(user);

    return {
        accessToken,
        refreshToken: {
            token: refreshToken.token,
            email: refreshToken.userEmail,
            expires: refreshToken.expires
        }
    };
};

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res, next) => {
    try {
        if (isEmailBlacklisted(req.body.email)) {
            return res.status(403).send({
                errorType: 'FIELD_ERROR',
                field: 'email',
                message: 'The email provided is blacklisted'
            });
        }

        let user = await models.user.findOne({ where: { email: req.body.email } });

        if (user) {
            return res.status(409).json({
                errorType: 'FIELD_ERROR',
                field: 'email',
                message: 'This email is already taken'
            });
        }

        const userPassword = generateHash(req.body.password);
        const language = languageValidator(req.body.language);

        user = await models.user.create({
            email: req.body.email,
            password: userPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            language
        });

        const tokenData = {
            token: `${crypto.randomBytes(40).toString('hex')}`,
            userId: user.userId
        };
        await models.email_verification_token.create(tokenData);

        user = { ...user.dataValues };
        delete user.password;

        const { accessToken, refreshToken } = await generateTokenResponse(user);

        res.status(httpStatus.CREATED);
        res.send(Object.assign({}, { accessToken, refreshToken }, { user }));
    } catch (error) {
        console.error('register endpoint', error);
        return next(error);
    }
};

/**
 * Get logged in user info
 * @public
 */
exports.getMe = async (req, res, next) => {
    try {
        res.send(req.user);
    } catch (error) {
        console.error('getme endpoint', error);
        next(error);
    }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
    try {
        const loginErrorMsg = 'The provided credentials didn\'t match any user in our database.';

        // delete refreshToken
        if (req.body.refreshToken) {
            await deleteRefreshToken(req.body.refreshToken.token);
        }

        let user = await models.user.findOne({ where: { email: req.body.email, status: 'active' } });

        if (!user) {
            throw new AuthenticationError({ message: loginErrorMsg });
        }

        if (!isPasswordValid(user.password, req.body.password)) {
            throw new AuthenticationError({ message: loginErrorMsg });
        }

        user = user.dataValues;
        delete user.password;

        const { accessToken, refreshToken } = await generateTokenResponse(user);
        return res.json(Object.assign({}, { accessToken, refreshToken }, { user }));
    } catch (error) {
        console.error('profile endpoint', error);
        return next(error);
    }
};

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
    try {
        const { email, token } = req.body;

        let refreshToken = await models.refresh_token.find({ where: { token, userEmail: email } });

        if (!refreshToken) {
            throw new AuthenticationError({ message: 'Problem with the token' });
        }

        // check if refreshToken is still valid
        if (moment().isAfter(moment(refreshToken.expires))) {
            console.error('Refresh token expired');
            await refreshToken.destroy();
            throw new AuthenticationError({ message: 'Problem with the token' });
        }

        const user = await models.user.find({ where: { email } });

        refreshToken = await refreshToken.updateAttributes({
            token: `${user.userId}.${crypto.randomBytes(40).toString('hex')}`
        });

        return res.json({
            accessToken: generateUserAccessToken(user.userId),
            refreshToken: {
                token: refreshToken.token,
                email: refreshToken.userEmail,
                expires: refreshToken.expires
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        const { token } = req.body;

        const refreshToken = await models.refresh_token.find({ where: { token } });

        if (!refreshToken) {
            return res.sendStatus(httpStatus.OK);
        }

        await refreshToken.destroy();

        res.sendStatus(httpStatus.OK);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
