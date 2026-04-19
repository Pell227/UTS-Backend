const express = require("express");
const router = express.Router();
const categoryController = require("./category_controller");

module.exports = (app) => {
    app.use("/category", router)

    router.get("/", categoryController.getAllCategories);
    router.post("/", categoryController.createCategory);
    router.get("/:id", categoryController.getCategoryById);
    router.put("/:id", categoryController.updateCategory);
    router.delete("/:id", categoryController.deleteCategory);
    router.get("/", categoryController.getCategoryByName);
    router.get("/", categoryController.getCategoryBySorting);
};
