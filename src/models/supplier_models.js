const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    no: { type: String, required: true, unique: true },
    nama_supplier: { type: String, required: true },
    alamat: { type: String, required: true },
    telepon: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const supplier = mongoose.model("Supplier", supplierSchema);

module.exports = { supplier };
