const express = require("express");
const router = express.Router();

module.exports = (productController) => {
  router.get("/products", productController.getAll);
  router.get("/products/:id", productController.getOne);
  router.post("/products", productController.create);
  router.put("/products/:id", productController.update);
  router.delete("/products/:id", productController.remove);

  return router;
};