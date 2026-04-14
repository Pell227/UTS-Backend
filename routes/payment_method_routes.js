const express = require("express");
const paymentController = require("../controllers/payment_method_controller");
const router = express.Router();

module.exports = (app) => {
  app.use("/payment-methods", router);

  router.get("/", paymentController.getAllPaymentMethods);
  router.get("/:id", paymentController.getPaymentMethodById);
  router.post("/", paymentController.createPaymentMethod);
};