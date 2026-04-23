const { supplier } = require("../../../models/supplier_models");

async function getSuppliers() {
    return supplier.find({});
}

async function getSupplierById(id) {
    return supplier.findById(id);
}

async function createSupplier(data) {
    const newSupplier = new supplier(data);
    return await newSupplier.save();
}

async function updateSupplier(id, data) {
    return supplier.findByIdAndUpdate(id, data, { new: true });
}

async function deleteSupplier(id) {
    return supplier.findByIdAndDelete(id);
}

module.exports = { 
  getSuppliers, 
  getSupplierById, 
  createSupplier, 
  updateSupplier, 
  deleteSupplier 
};
