const mongoose = require("mongoose");

const TLSchema = new mongoose.Schema(
  {
    transaction_id: { type: String, required: true },
    receipt_id: { type: Number, required: true, unique: true },
    cashier_id: { type: String, required: true },
    cashier_name: { type: String, required: true },
    cashier_station: { type: Number, required: true },
    store_id: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true },
);

const TL = mongoose.model("TransactionList", TLSchema);

module.exports = { TL };
