const { category } = require("../../../models/category_models");

const createCategory = async (data) => {
  const newCat = new category(data);
  return await newCat.save();
};

const getAllCategories = async () => {
  return await category.find({});
};

const getCategoryById = async (id) => {
  return await category.findById(id);
};

const updateCategory = async (id, data) => {
  const existing = await category.findById(id);
  if (!existing) return null;
  return await category.findByIdAndUpdate(id, data, { new: true });
};

const deleteCategory = async (id) => {
  const existing = await category.findById(id);
  if (!existing) return null;
  await category.findByIdAndDelete(id);
  return true;
};

const getCategoryByName = async (keyword) => {
  return await category.find({
    nameK: { $regex: keyword || "", $options: "i" },
  });
};

const getCategoryBySorting = async (sortBy = "nameK", order = "ASC") => {
  const sortOrder = order.toUpperCase() === "DESC" ? -1 : 1;
  return await category.find({}).sort({ [sortBy]: sortOrder });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryByName,
  getCategoryBySorting,
};
