// services/product.service.js
module.exports = (productRepository) => {

  const getProducts = async () => {
    return await productRepository.getAll();
  };

  const getProductById = async (id) => {
    const product = await productRepository.getById(id);
    if (!product) throw new Error("Product not found");
    return product;
  };

  const createProduct = async (data) => {
    return await productRepository.create(data);
  };

  const updateProduct = async (id, data) => {
    const product = await productRepository.update(id, data);
    if (!product) throw new Error("Product not found");
    return product;
  };

  const deleteProduct = async (id) => {
    const product = await productRepository.remove(id);
    if (!product) throw new Error("Product not found");
    return product;
  };

  return {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};