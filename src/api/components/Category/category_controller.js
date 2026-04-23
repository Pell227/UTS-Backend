const categoryClassification = require("./category_repository");
const { errorTypes, errorResponder } = require("../../../core/error");

// GET ALL
const getAllCategories = async (req, res, next) => {
    try {
        const data = await categoryClassification.getAllCategories();
        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return next(
            errorResponder(errorTypes.SERVER, error.message)
        );
    }
};

// GET BY ID
const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await categoryClassification.getCategoryById(id);

        if (!data) {
            return next(
                errorResponder(errorTypes.NOT_FOUND, "Data Tidak Ditemukan")
            );
        }

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return next(
            errorResponder(errorTypes.SERVER, error.message)
        );
    }
};

// CREATE
const createCategory = async (req, res, next) => {
    try {
        const newData = await categoryClassification.createCategory(req.body);

        return res.status(201).json({
            success: true,
            message: "Berhasil menambahkan Kategori",
            data: newData
        });
    } catch (error) {
        return next(
            errorResponder(errorTypes.SERVER, error.message)
        );
    }
};

// UPDATE
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await categoryClassification.updateCategory(id, req.body);

        return res.status(200).json({
            success: true,
            data: updated
        });
    } catch (error) {
        return next(
            errorResponder(errorTypes.SERVER, error.message)
        );
    }
};

// DELETE
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        await categoryClassification.deleteCategory(id);

        return res.status(200).json({
            success: true,
            message: "Data telah dihapus"
        });
    } catch (error) {
        return next(
            errorResponder(errorTypes.SERVER, error.message)
        );
    }
};

// SEARCH
const getCategoryByName = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        const data = await categoryClassification.getCategoryByName(keyword);

        return res.status(200).json({
            success: true,
            message: "Data berhasil ditemukan",
            data
        });
    } catch (error) {
        return next(
            errorResponder(errorTypes.SERVER, error.message)
        );
    }
};

// SORT
const getCategoryBySorting = async (req, res, next) => {
    try {
        const { sortBy = "nameK", order = "ASC" } = req.query;

        const data = await categoryClassification.getCategoriesBySorting(sortBy, order);

        return res.status(200).json({
            success: true,
            message: "Data berhasil di Sorting",
            data
        });
    } catch (error) {
        return next(
            errorResponder(errorTypes.SERVER, error.message)
        );
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryByName,
    getCategoryBySorting
};