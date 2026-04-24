const express = require("express");
const router = express.Router();
const supplierController = require("./supplier_controller");

module.exports = (app) => {
  app.use("/supplier", router);

  router.get("/", supplierController.getAllSuppliers);
  router.get("/:id", supplierController.getSupplierById);
  router.post("/", supplierController.createSupplier);
  router.put("/:id", supplierController.updateSupplier);
  router.delete("/:id", supplierController.deleteSupplier);
};
