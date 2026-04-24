const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    InvenId: { type: String, required: true, unique: true },
    nameI: { type: String, required: true },
    stock: { type: Number, required: true },
    statusI: { type: String, required: true },
  },
  { timestamps: true },
);

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = { Inventory };
