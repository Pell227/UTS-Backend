const categoryRepository = require('src/api/components/Category/category_repository');

async function getAllCategories() {
    return await categoryRepository.getCategory();
}

async function getCategoryById() {
    return await categoryRepository.getCategoryById(id);
}

async function getCategoryByName() {
    return await categoryRepository.getCategoryByName(keyword);
}

async function getCategoryBySorting() {
    return await categoryRepository.getCategoryBySorting(sortBy, order);
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    getCategoryBySorting
};