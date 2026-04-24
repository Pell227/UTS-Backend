const inventoryRepository = require("./inventory_repository");

async function createInventory(data) {
  if (
    !data.InvenId ||
    !data.nameI ||
    data.stock === undefined ||
    !data.statusI
  ) {
    throw new Error("InvenId, nameI, stock, dan statusI wajib diisi");
  }
  return await inventoryRepository.createInventory(data);
}

async function getAllInventory() {
  return await inventoryRepository.getAllInventory();
}

async function getInventoryById(id) {
  const data = await inventoryRepository.getInventoryById(id);
  if (!data) throw new Error("Barang tidak ditemukan");
  return data;
}

async function updateInventory(id, data) {
  const updated = await inventoryRepository.updateInventory(id, data);
  if (!updated) throw new Error("Barang tidak ditemukan");
  return updated;
}

async function deleteInventory(id) {
  const deleted = await inventoryRepository.deleteInventory(id);
  if (!deleted) throw new Error("Barang tidak ditemukan");
  return deleted;
}

module.exports = {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
};
