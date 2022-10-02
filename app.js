const http = require('http');
const router = require('./routes/product.route');

const app = http.createServer((req, res) => {
    router(req, res);
});

module.exports = app;