const categoryClassification = require("./category_repository");

const getAllCategories = async(req, res) => {
    try {
        const data = await categoryClassification.getAllCategories();
        return res.status(200).json({
            success : true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }   
};

const getCategoryById = async(req, res) => {
    try {
        const {id} = req.params;
        const data = await categoryClassification.getCategoryById(id);

        if (!data) {
            return res.status(404).json({
                success : false,
                message : "Data Tidak Ditemukan"
            });
        }   
        return res.status(200).json({
            success:true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
};

const createCategory = async(req, res) => {
    try {
        const newData = await categoryClassification.createCategory(req.body);
        
        return res.status(201).json ({
            success : true,
            message : "Berhasil menambahkan Kategori",
            data : newData
        });
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
};

const updateCategory = async(req, res) => {
    try {
        const {id} = req.params;
        const updated = await categoryClassification.updateCategory(id, req.body);

        return res.status(200).json({
            success : true,
            data : updated
        });
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
};

const deleteCategory = async(req, res) => {
    try {
        const {id} = req.params;
        await categoryClassification.deleteCategory(id);

        return res.status(200).json({
            success : true,
            message : "Data telah dihapus"
        });
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
};

const getCategoryByName = async(req, res) => {
    try {
        const {keyword} = req.query;

        const data = await categoryClassification.getCategoryByName(keyword);

        return res.status(200).json({
            success : true,
            message : "Data berhasil ditemukan",
            data
        });
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
};

const getCategoryBySorting = async(req, res) => {
    try {
        const{sortBy = "nameK", order = "ASC"} = req.query;

        const data = await categoryClassification.getCategoriesBySorting(soryBy, order);

        return res.status(200).json({
            success : true,
            message : "Data berhasil di Sorting",
            data
        });
    } catch (error) {
        return req.status(500).json ({
            success : false,
            message : error.message
        });
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
}