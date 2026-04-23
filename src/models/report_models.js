const mongoose = require("mongoose");

const report = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },

    start_date: {
      type: Date,
      require: true,
    },

    end_date: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true },
);
const reports = mongoose.model("Report", report);

module.exports = { reports };
