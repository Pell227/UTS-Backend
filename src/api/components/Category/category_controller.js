const categoryService = require("./category_service");
const { errorTypes, errorResponder } = require("../../../core/error");

const getAllCategories = async (req, res, next) => {
  try {
    const data = await categoryService.getAllCategories();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const data = await categoryService.getCategoryById(req.params.id);
    if (!data)
      return next(errorResponder(errorTypes.NOT_FOUND, "Data Tidak Ditemukan"));
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

const createCategory = async (req, res, next) => {
  try {
    const newData = await categoryService.createCategory(req.body);
    return res
      .status(201)
      .json({
        success: true,
        message: "Berhasil menambahkan Kategori",
        data: newData,
      });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const updated = await categoryService.updateCategory(
      req.params.id,
      req.body,
    );
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "Data telah dihapus" });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

const getCategoryByName = async (req, res, next) => {
  try {
    const data = await categoryService.getCategoryByName(req.query.keyword);
    return res
      .status(200)
      .json({ success: true, message: "Data berhasil ditemukan", data });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

const getCategoryBySorting = async (req, res, next) => {
  try {
    const { sortBy = "nameK", order = "ASC" } = req.query;
    const data = await categoryService.getCategoryBySorting(sortBy, order);
    return res
      .status(200)
      .json({ success: true, message: "Data berhasil di Sorting", data });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryByName,
  getCategoryBySorting,
};
