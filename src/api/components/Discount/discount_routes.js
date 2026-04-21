const express = require("express");
const promoController = require("../../components/");

const router = express.Router();

module.exports = (app) => {
  app.use("/api/promos", router);

  router.get("/", promoController.getPromos);
  router.get("/:id", promoController.getPromoById);
  router.post("/", promoController.createPromo);
  router.put("/:id", promoController.updatePromo);
  router.delete("/:id", promoController.deletePromo);

  // BONUS
  router.post("/apply", promoController.applyPromo);
};
