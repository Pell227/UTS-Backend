const TLrepository = require("./TL_repository");

async function createlist(data) {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Valid data is required");
  }

  return TLrepository.createList(data);
}

async function getAllList(filter = {}, options = {}) {
  return TLrepository.getList(filter, options);
}

async function getListById(id) {
  if (!id) {
    throw new Error("List ID is required");
  }

  const list = await TLrepository.getListById(id);

  if (!list) {
    throw new Error("Transaction list does not exist");
  }

  return list;
}

async function updateList(id, data) {
  if (!id) {
    throw new Error("List ID is required");
  }

  if (!data || Object.keys(data).length == 0) {
    throw new Error("Update data is required");
  }

  const updated = await TLrepository.updateList(id, data);

  if (!updated) {
    throw new Error("Transaction list does not exist");
  }

  return updated;
}

async function deleteList(id) {
  if (!id) {
    throw new Error("List ID is required");
  }

  const deleted = await TLrepository.deleteList(id);

  if (!deleted) {
    throw new Error("Transaction list does not exist");
  }

  return deleted;
}

module.exports = {
  getAllList,
  getListById,
  createlist,
  updateList,
  deleteList,
};
