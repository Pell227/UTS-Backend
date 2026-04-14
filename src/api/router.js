const express = require("express");

const staff = require("./routes/staff_routes");
const report = require("./components/Report/report_routes");

module.exports = () => {
  const app = express.Router();

  staff(app);
  report(app);

  return app;
};
