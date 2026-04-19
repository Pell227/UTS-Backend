const { payment_method } = require("../models/payment_method_model");

async function getPaymentMethods(filter = {}) {
  return payment_method.find(filter);
}

async function getPaymentMethodById(id) {
  return payment_method.findById(id);
}

async function createPaymentMethod(data) {
  const newData = new payment_method(data);
  return await newData.save();
}

async function updatePaymentMethod(id, data) {
  return payment_method.findByIdAndUpdate(id, data, { new: true });
}

async function deletePaymentMethod(id) {
  return payment_method.findByIdAndDelete(id);
}

module.exports = {
  getPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod
};