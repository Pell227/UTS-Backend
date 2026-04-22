const productService = require("./product_service");
const { errorTypes, errorResponder } = require("../../../core/error");

// GET ALL
async function getAllProducts(req, res, next) {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    return next(
      errorResponder(errorTypes.SERVER, error.message)
    );
  }
}

// GET BY ID
async function getProductById(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Product not found")
      );
    }

    res.json(product);
  } catch (error) {
    return next(
      errorResponder(errorTypes.SERVER, error.message)
    );
  }
}

// CREATE
async function createProduct(req, res, next) {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    return next(
      errorResponder(errorTypes.BAD_REQUEST, error.message)
    );
  }
}

// UPDATE
async function updateProduct(req, res, next) {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );

    if (!updatedProduct) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Product not found")
      );
    }

    res.json(updatedProduct);
  } catch (error) {
    return next(
      errorResponder(errorTypes.BAD_REQUEST, error.message)
    );
  }
}

// DELETE
async function deleteProduct(req, res, next) {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);

    if (!deletedProduct) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Product not found")
      );
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    return next(
      errorResponder(errorTypes.SERVER, error.message)
    );
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};