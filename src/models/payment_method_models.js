const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema(
  {
    name_pm: { type: String, required: true },
    type_pm: { type: String, required: true },
    provider_pm: { type: String },
    isActive_pm: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const payment_method = mongoose.model("PaymentMethod", paymentMethodSchema);

module.exports = { payment_method };
