const express = require("express");
const controller = require("./promo_controller");

const router = express.Router();

module.exports = (app) => {
  app.use("/promos", router);

  router.get("/", controller.getPromos);
  router.post("/", controller.createPromo);
  router.post("/apply", controller.applyPromo);
  router.get("/:id", controller.getPromoById);
  router.put("/:id", controller.updatePromo);
  router.delete("/:id", controller.deletePromo);
};
