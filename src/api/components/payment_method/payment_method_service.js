const repo = require("./payment_method_repository");

// GET ALL + FILTER
const getPaymentMethods = async (query) => {
  const filter = {};

  if (query.type) {
    filter.type = query.type;
  }

  return await repo.getPaymentMethods(filter);
};

// GET BY ID
const getPaymentMethodById = async (id) => {
  return await repo.getPaymentMethodById(id);
};

// CREATE
const createPaymentMethod = async (data) => {
  const { name_pm, type_pm } = data;

  if (!name_pm || !type_pm) {
    throw new Error("name and type are required");
  }

  return await repo.createPaymentMethod(data);
};

// UPDATE
const updatePaymentMethod = async (id, data) => {
  return await repo.updatePaymentMethod(id, data);
};

// DELETE
const deletePaymentMethod = async (id) => {
  return await repo.deletePaymentMethod(id);
};

// UPDATE STATUS
// Fix: now calls the dedicated repo.updateStatus instead of the generic update
const updateStatus = async (id, isActive) => {
  return await repo.updateStatus(id, isActive);
};

// promo_service.js — applyPromo yang diperbaiki
const applyPromo = async (code, amount) => {
  const promo = await repo.findPromoByCode(code); // ← langsung query by code

  if (!promo) {
    throw new Error("Promo tidak valid atau tidak aktif");
  }

  let discountAmount = 0;

  if (promo.type === "percentage") {
    discountAmount = (promo.discount / 100) * amount;
    if (promo.maxDiscount) {
      discountAmount = Math.min(discountAmount, promo.maxDiscount);
    }
  } else {
    discountAmount = promo.discount;
  }

  const finalPrice = Math.max(0, amount - discountAmount); // ← guard biar tidak negatif

  return { discountAmount, finalPrice };
};

module.exports = {
  getPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  updateStatus,
};
