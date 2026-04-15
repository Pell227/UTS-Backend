const repo = require("../repository/payment_method_repository");

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
  const { name, type } = data;

  if (!name || !type) {
    throw new Error("name dan type wajib diisi");
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
const updateStatus = async (id, isActive) => {
  return await repo.updatePaymentMethod(id, { isActive });
};

module.exports = {
  getPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  updateStatus
};