module.exports = (productService) => {

  const getAll = async (req, res) => {
    try {
      const data = await productService.getProducts();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getOne = async (req, res) => {
    try {
      const data = await productService.getProductById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  const create = async (req, res) => {
    try {
      const data = await productService.createProduct(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  const update = async (req, res) => {
    try {
      const data = await productService.updateProduct(req.params.id, req.body);
      res.json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  const remove = async (req, res) => {
    try {
      await productService.deleteProduct(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  return {
    getAll,
    getOne,
    create,
    update,
    remove,
  };
};