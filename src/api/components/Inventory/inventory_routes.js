const express = require("express");
const inventoryController = require("./inventory_controller");

const router = express.Router();

module.exports = (app) => {
  app.use("/inventory", router);

  router.post("/", inventoryController.createInventory);
  router.get("/", inventoryController.findAllInventory);
  router.get("/:id", inventoryController.findOne);
  router.put("/:id", inventoryController.updateInventory);
  router.delete("/:id", inventoryController.removeInventory);
};
