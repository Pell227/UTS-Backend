const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    nameK: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, default: "active" },
  },
  { timestamps: true },
);

const category = mongoose.model("Category", categorySchema);

module.exports = { category };
