const { databaseConfig } = require('../vars');

// uncomment when we have a certificate
// if (env === 'production') {
//     settings.dialectOptions = {
//         ssl: {
//             ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
//         }
//     };
// }

module.exports = {
    development: databaseConfig,
    test: databaseConfig,
    production: databaseConfig
};
