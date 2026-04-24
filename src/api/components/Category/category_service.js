const categoryRepository = require("./category_repository");

async function getAllCategories() {
  return await categoryRepository.getAllCategories();
}

async function getCategoryById(id) {
  return await categoryRepository.getCategoryById(id);
}

async function createCategory(data) {
  return await categoryRepository.createCategory(data);
}

async function updateCategory(id, data) {
  return await categoryRepository.updateCategory(id, data);
}

async function deleteCategory(id) {
  return await categoryRepository.deleteCategory(id);
}

async function getCategoryByName(keyword) {
  return await categoryRepository.getCategoryByName(keyword);
}

async function getCategoryBySorting(sortBy, order) {
  return await categoryRepository.getCategoryBySorting(sortBy, order);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryByName,
  getCategoryBySorting,
};
