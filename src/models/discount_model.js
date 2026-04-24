const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    type: { type: String, required: true },
    maxDiscount: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const promo = mongoose.model("Promo", promoSchema);

module.exports = { promo };
