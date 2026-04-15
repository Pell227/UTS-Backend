const express = require("express");
const paymentController = require("../controllers/payment_method_controller");
const router = express.Router();

module.exports = (app) => {
  app.use("/api/payment-methods", router);

  router.get("/", paymentController.getPaymentMethodsByType); 
  router.get("/:id", paymentController.getPaymentMethodById);
  router.post("/", paymentController.createPaymentMethod);
  router.put("/:id", paymentController.updatePaymentMethod);
  router.delete("/:id", paymentController.deletePaymentMethod);
  router.patch("/:id/status", paymentController.updateStatus);
};