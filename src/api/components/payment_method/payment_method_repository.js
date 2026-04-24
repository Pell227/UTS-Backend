const mongoose = require("mongoose");
const { payment_method } = require("../../../models/payment_method_models");

async function getPaymentMethods(filter = { code, isActive: true }) {
  return payment_method.find(filter);
}

// Fix: validate ObjectId before querying to avoid CastError 500s
async function getPaymentMethodById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return payment_method.findById(id);
}

async function createPaymentMethod(data) {
  const newData = new payment_method(data);
  return await newData.save();
}

// Fix: use $set to prevent arbitrary field overwrites
async function updatePaymentMethod(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const { name_pm, type_pm } = data;
  return payment_method.findByIdAndUpdate(
    id,
    { $set: { name_pm, type_pm } },
    { new: true },
  );
}

async function deletePaymentMethod(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return payment_method.findByIdAndDelete(id);
}

// Fix: dedicated updateStatus function now exported from repo
async function updateStatus(id, isActive) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return payment_method.findByIdAndUpdate(
    id,
    { $set: { isActive } },
    { new: true },
  );
}

module.exports = {
  getPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  updateStatus,
};
