const { product } = require("../../../models/product_models");

async function getProducts() {
    return product.find({});
}

async function getProductById(id) {
    return product.findById(id);
}

async function createProduct(data) {
    const newProduct = new product(data);
    return await newProduct.save();
}

async function updateProduct(id, data) {
    return product.findByIdAndUpdate(id, data, { new: true });
}

async function deleteProduct(id) {
    return product.findByIdAndDelete(id);
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };