const supplierRepository = require("./supplier_repository");

async function getSuppliers() {
  return await supplierRepository.getSuppliers();
}

async function getSupplierById(id) {
  return await supplierRepository.getSupplierById(id);
}

async function createSupplier(data) {
  return await supplierRepository.createSupplier(data);
}

async function updateSupplier(id, data) {
  return await supplierRepository.updateSupplier(id, data);
}

async function deleteSupplier(id) {
  return await supplierRepository.deleteSupplier(id);
}

module.exports = {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
