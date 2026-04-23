module.exports = (db) => { 
    const { category } = require('../models/category_models');
    const Category = db.category;
    const {Op} = db.Sequelize;

    const createCategory = async (data) => {
        try {
            return await category.create({
                id : data.id,
                nameK : data.nameK,
                description : data.description,
                status : data.status,

            });     
        } catch(error) {
            throw error;
        }
    };

    const getAllCategories = async(data) => {
        try {
            return await category.findAll();
        } catch(error) {
            throw error;
        }
    };

    const getCategoryById = async(id) => {
        try {
            return await category.findByPk(id);
        } catch(error) {
            throw error;
        }
    };

    const updateCategory = async (id, data) => {
        try {
            return await category.findByPk(id);
            if(!category) return null;

            return await category.update({
                id : data.id,
                nameK : data.nameK,
                description : data.description,
                status : data.status,
            });
        } catch(error) {
            throw error;
        }
    };

    const deleteCategory = async (id, data) => {
        try {
            return await category.findByPk(id);
            if(!category) return null;

            await category.destroy();
            return true;
        } catch (error) {
            throw error;
        }
    };

    const getCategoryByName = async (keyword) => {
        try {
            return await category.findAll({
                where : {
                    nameK : {
                        [Op.like] : `%${keyword}%`, 
                    },
                },
            });
        } catch (error) {
            throw error;
        }
    };

    const getCategoryBySorting = async (order = "ASC") => {
        try {
            return await category.findAll({
                order : [['nameK', order]],
            });
        } catch(error) {
            throw error;
        }
    };

    return {
        createCategory,
        getAllCategories,
        getCategoryById,
        updateCategory,
        deleteCategory,
    //    Query
        getCategoryByName,
        getCategoryBySorting,
    };
};