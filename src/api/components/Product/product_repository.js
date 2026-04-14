module.exports = (Product) => {

  const getAll = async () => {
    return await Product.findAll();
  };

  const getById = async (id) => {
    return await Product.findByPk(id);
  };

  const create = async (data) => {
    return await Product.create(data);
  };

  const update = async (id, data) => {
    const product = await Product.findByPk(id);
    if (!product) return null;

    return await product.update(data);
  };

  const remove = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) return null;

    await product.destroy();
    return product;
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};