const Products = require('../models/product.model');

const welcome = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Welcome to the Server!' }));
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.findAll();
        (!products.length) ? res.end('no item found!'):
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    } catch (err) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: err.message }));
    }
}

const getProduct = async (req, res, id) => {
    try {
        const product = await Products.findOne(id);
        (!product) ? res.end('product not found!'):
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(product));
    } catch (err) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: err.message }));
    }
}

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                resolve(body);
            });
        } catch (err) {
            reject(err.message);
        }
    });
}

const createProduct = async (req, res) => {
    try {
        const postData = await getPostData(req);
        const { name, price, quantity, rating } = JSON.parse(postData);
        const product = { id: new Date(Date.now()), name, price, quantity, rating };
        const status = await Products.createOne(product);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: status }));
    } catch (err) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: err.message }));
    }
}

const updateProduct = async (req, res, id) => {
    try {
        const product = await Products.findOne(id);
        if (!product) res.end('product not found!');
        const updatedData = await getPostData(req);
        const { name, price, quantity, rating } = JSON.parse(updatedData);
        const updatedProduct = {
            name: name || product.name,
            price: price || product.price,
            quantity: quantity || product.quantity,
            rating: rating || product.quantity
        }
        const status = await Products.updateOne(id, updatedProduct);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: status }));
    } catch (err) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: err.message }));
    }
}

const deleteProduct = async (req, res, id) => {
    try {
        const status = await Products.deleteOne(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: status }));
    } catch (err) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: err.message }));
    }
}

const routeNotFound = (req, res) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'route not found!' }));
}

module.exports = { welcome, getAllProducts, getProduct, createProduct, updateProduct, deleteProduct, routeNotFound };