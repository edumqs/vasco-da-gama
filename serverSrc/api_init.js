const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const { port } = require('./src/vars');
const app = require('./src/api-src/config/express');

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
    key: fs.readFileSync(path.resolve('serverSrc', 'dev_certificate', 'server.key'), 'utf8'),
    cert: fs.readFileSync(path.resolve('serverSrc', 'dev_certificate', 'server.cert'), 'utf8')
}, app);

httpServer.listen(port);
httpsServer.listen(8443);

// /**
// * Exports express
// * @public
// */
module.exports = app;
