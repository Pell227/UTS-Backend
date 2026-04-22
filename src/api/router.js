const express = require("express");

const staff = require("./components/Staff/staff_routes");
const report = require("./components/Report/report_routes");
const product = require("./components/Product/product_routes");
const payment_methods = require("./components/payment_method/payment_methods_routes");
const category = require("./components/category/category_routes");
const transaction = require("./components/transaction/transaction_routes");
const transaction_list = require("./components/Transaction_list/TL_route");

module.exports = () => {
  const app = express.Router();

  staff(app);
  report(app);
  product(app);
  discount(app);
  payment_methods(app);
  category(app);
  transaction(app);
  transaction_list(app);

  return app;
};
