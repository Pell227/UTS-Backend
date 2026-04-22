const { product } = require("../../../models/product_models");

async function getProducts() {
  return product.findAll();
}

async function getProductById(id) {
  return product.findByPk(id);
}

async function createProduct(data) {
  return product.create(data);
}

async function updateProduct(id, data) {
  const existingProduct = await product.findByPk(id);

  if (!existingProduct) {
    return null;
  }

  await existingProduct.update(data);
  return existingProduct;
}

async function deleteProduct(id) {
  const existingProduct = await product.findByPk(id);

  if (!existingProduct) {
    return null;
  }

  await existingProduct.destroy();
  return existingProduct;
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
