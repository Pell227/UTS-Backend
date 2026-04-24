const productRepository = require("./product_repository");

async function getProducts() {
  return await productRepository.getProducts();
}

async function getProductById(id) {
  return await productRepository.getProductById(id);
}

async function createProduct(data) {
  return await productRepository.createProduct(data);
}

async function updateProduct(id, data) {
  return await productRepository.updateProduct(id, data);
}

async function deleteProduct(id) {
  return await productRepository.deleteProduct(id);
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
