const express = require("express");
const controller = require("../controllers/promo_controller");

const router = express.Router();

module.exports = (app) => {
  app.use("/api/promos", router);

  router.get("/", controller.getPromos);
  router.get("/:id", controller.getPromoById);
  router.post("/", controller.createPromo);
  router.put("/:id", controller.updatePromo);
  router.delete("/:id", controller.deletePromo);

  // 🔥 BONUS ENDPOINT
  router.post("/apply", controller.applyPromo);
};