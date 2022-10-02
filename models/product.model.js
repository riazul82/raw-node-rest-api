let products = require('../data/products.json');
const { storeData } = require('../config/storeData');

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

const findOne = (id) => {
    return new Promise((resolve, reject) => {
        const product = products.find((item) => item.id === id);
        resolve(product);
    });
}

const createOne = (product) => {
    return new Promise((resolve, reject) => {
        products.push(product);
        storeData('./data/products.json', products);
        resolve('created!');
    });
}

const updateOne = (id, product) => {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((item) => item.id === id);
        products[index] = {
            id,
            ...product
        };
        storeData('./data/products.json', products);
        resolve('updated!');
    });
}

const deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        products = products.filter((item) => item.id !== id);
        storeData('./data/products.json', products);
        resolve('deleted!');
    });
}

module.exports = { findAll, findOne, createOne, updateOne, deleteOne };