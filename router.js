const express = require("express");

const staff = require("./routes/staff_routes");

module.exports = (app) => {
  const app = express.Router();

  staff(app);

  return app;
};
