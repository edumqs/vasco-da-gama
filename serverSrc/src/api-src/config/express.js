const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const helmet = require('helmet');
const passport = require('passport');
const Exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const {
    logs,
    env,
    analytics
} = require('../../vars');

const routes = require('../api/routes/v1/index');
const strategies = require('./passport');
const error = require('../api/middlewares/error');

/**
 * Express instance
 * @public
 */
const app = express();

// rate limiter
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 200
}); // total: max 200 requests per minute per ip

app.use(apiLimiter);

app.enable('trust proxy');

// request logging. dev: console | production: file
app.use(morgan(logs));

const limit = '10mb';

// parse body params and attache them to req.body
app.use(bodyParser.json({ limit }));
app.use(bodyParser.urlencoded({ limit, extended: true }));
app.use(bodyParser.raw({ limit }));
app.use(bodyParser.text({ limit }));

app.use(cookieParser());

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// init handlebars templates
const handlebars = new Exphbs({
    layoutsDir: path.resolve(path.join(__dirname, '../../templates'))
});

app.engine('handlebars', handlebars);

app.set('views', path.resolve(path.join(__dirname, '../../templates')));
app.set('view engine', 'handlebars');

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

// serves all static files stored under public
app.use(express.static('public'));

// mount api v1 routes with no cache headers
app.use('/api/1', helmet.noCache(), routes);

const getRouteData = () => ({
    analytics,
    isProd: env === 'production'
});

// catches all requests where endpoint is not defined or resource is not available
app.get('/*', (req, res, next) => {
    if (req.originalUrl === '/favicon-32x32.png' || req.originalUrl.includes('api')) {
        return next();
    }

    return res.render('app', { ...getRouteData() });
});

// if error is not an instanceOf of a known error, convert it.
app.use(error.errorHandler);

// catch 404 and forward to error handler
app.use(error.notFound);

module.exports = app;
