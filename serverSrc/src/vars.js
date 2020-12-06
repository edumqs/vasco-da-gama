const path = require('path');
const pkg = require('../../package.json');

const currentVersion = pkg.version;

// import .env variables
require('dotenv-safe').config({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
});

const env = process.env.NODE_ENV;
const isProd = env === 'production';

const common = {
    dialect: 'mysql',
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeData'
};

const databaseConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    ...common
};

module.exports = {
    env,
    isProd,
    hostUrl: isProd ? '' : '',
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
    logs: isProd ? 'combined' : 'dev',
    currentVersion,
    databaseConfig,
    blackListedEmailDomains: [
        'zhorachu.com',
        'ethersports.org',
        'tinoza.org',
        'payperex2.com',
        'nezdiro.org',
        'ether123.net',
        'reftoken.net',
        'averdov.com',
        'axsup.net',
        'datum2.com',
        'geronra.com',
        'asorent.com',
        'amail.club',
        'wmail.club@duck2.club',
        'cars2.club',
        'banit.club',
        'banit.me',
        'nada.ltd',
        'getnada.com',
        'mailinator.com',
        'yopmail.com'
    ]
};
