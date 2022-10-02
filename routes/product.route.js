const { welcome, getAllProducts, getProduct, createProduct, updateProduct, deleteProduct, routeNotFound } = require("../controllers/product.control");

const router = (req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        welcome(req, res);
    } else if (req.url === '/api/products' && req.method === 'GET') {
        getAllProducts(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/').pop();
        getProduct(req, res, id);
    } else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/').pop();
        updateProduct(req, res, id);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/').pop();
        deleteProduct(req, res, id);
    } else {
        routeNotFound(req, res);
    }
}

module.exports = router;