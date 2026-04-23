const { TL } = require("../../../models/TL_model");

async function createList(data) {
  return TL.create({ data });
}

async function getList(filter = {}, options = {}) {
  return TL.find(filter).limit(options.limit || 10);
}

async function getListById(id) {
  try {
    const list = await TL.findById(id);

    if (!list) {
      throw new Error("Transaction list not found");
    }

    return list;
  } catch (err) {
    throw new Error("Failed to get transaction list: " + err.message);
  }
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
