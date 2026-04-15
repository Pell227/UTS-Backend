const express = require("express");

const staff = require("./routes/staff_routes");
const report = require("./components/Report/report_routes");
const product = require("./routes/product_routes");
const order = require("./routes/order_routes");
const discount = require("./routes/discount_routes");
const payment_methods = require("./routes/payment_methods_routes");

module.exports = () => {
  const app = express.Router();

  staff(app);
  report(app);
  product(app);
  order(app);
  discount(app);
  payment_methods(app);

  return app;
};
