const mongoose = require("mongoose");

const report = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    start_date: {
      type: Date,
      required: true,
    },

    end_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);
const reports = mongoose.model("Report", report);

module.exports = { reports };
