const express = require("express");

const productController = require("./product_controller");

const router = express.Router();

module.exports = (app) => {
  app.use("/product", router);

  router.get("/", productController.getAllProducts);
  router.get("/:id", productController.getProductById);
  router.post("/", productController.createProduct);
  router.put("/:id", productController.updateProduct);
  router.delete("/:id", productController.deleteProduct);

  return router;
};
