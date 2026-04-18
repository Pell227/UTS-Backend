const express = require("express");
const controller = require("../controllers/payment_method_controller");

const router = express.Router();

module.exports = (app) => {
  app.use("/api/payment-methods", router);

  router.get("/", controller.getAllPaymentMethods);
  router.get("/:id", controller.getPaymentMethodById);
  router.post("/", controller.createPaymentMethod);
  router.put("/:id", controller.updatePaymentMethod);
  router.delete("/:id", controller.deletePaymentMethod);
  router.patch("/:id/status", controller.updateStatus);
};