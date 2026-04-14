const { payment_method } = require("../models");

async function getPaymentMethods() {
  return payment_method.find({});
}

async function getPaymentMethodById(id) {
  return payment_method.findById(id);
}

module.exports = {
  getPaymentMethods,
  getPaymentMethodById,
};