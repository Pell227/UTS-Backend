const { Inventory } = require("../../../models/inventory_models");

async function createInventory(data) {
  const newItem = new Inventory(data);
  return await newItem.save();
}

async function getAllInventory() {
  return Inventory.find({});
}

async function getInventoryById(id) {
  return Inventory.findById(id);
}

async function updateInventory(id, data) {
  return Inventory.findByIdAndUpdate(id, data, { new: true });
}

async function deleteInventory(id) {
  return Inventory.findByIdAndDelete(id);
}

module.exports = {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
};
