const { TL } = require("../../../models/TL_model");

async function createList(data) {
  return TL.create(data);
}

async function getList(filter = {}, options = {}) {
  return TL.find(filter).limit(options.limit || 100);
}

async function getListById(id) {
  return TL.findById(id);
}

async function updateList(id, data) {
  return TL.findByIdAndUpdate(id, data, { new: true });
}

async function deleteList(id) {
  return TL.findByIdAndDelete(id);
}

module.exports = {
  createList,
  getList,
  getListById,
  updateList,
  deleteList,
};
