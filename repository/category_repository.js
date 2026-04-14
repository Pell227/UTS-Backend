module.exports = (db) => { 
    const { category } = require('../models/category_models');
    const Category = db.category;
    const {Op} = db.Sequelize;

    const CreateCategory = async (data) => {
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
            })
        }
    }
}
