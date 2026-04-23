const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    NIP: {
      type: Number,
      required: true,
      unique: true,
    },
    names: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = { Staff };
