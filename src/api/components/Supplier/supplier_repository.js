const { supplier } = require("../../models");

async function getSuppliers() {
  return supplier.findAll();
}

async function getSupplierById(id) {
  return supplier.findByPk(id);
}

async function createSupplier(data) {
  return supplier.create(data);
}

async function updateSupplier(id, data) {
  const existingSupplier = await supplier.findByPk(id);

  if (!existingSupplier) {
    return null;
  }

  await existingSupplier.update(data);
  return existingSupplier;
}

async function deleteSupplier(id) {
  const existingSupplier = await supplier.findByPk(id);

  if (!existingSupplier) {
    return null;
  }

  await existingSupplier.destroy();
  return existingSupplier;
}

module.exports = {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};