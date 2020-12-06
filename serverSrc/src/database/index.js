const Sequelize = require('sequelize');
const User = require('./models/user');
const RefreshToken = require('./models/refresh_token');

const { databaseConfig } = require('../vars');

const {
    database,
    username,
    password,
    dialect,
    host,
    port
} = databaseConfig;

const databaseOptions = {
    host,
    dialect,
    port,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timestamps: true
    },
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    }
};

const sequelize = new Sequelize(database, username, password, databaseOptions);

// TODO :: improve this with dynamic imports

// init models
User(sequelize);
RefreshToken(sequelize);

module.exports = sequelize;
