const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true, unique: true },
    item_name: { type: String, required: true },
    amount: { type: Number, required: true },
    tax: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

const transactions = mongoose.model("Transactions", transactionsSchema);

module.exports = { transactions };
