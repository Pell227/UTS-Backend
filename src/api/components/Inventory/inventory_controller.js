const inventory_service = require("./inventory_service");

module.exports = (inventory_service) => {

    const createInventory = async(req, res) => {
        try {
            const result = await inventory_service.createInventory(req.body);
            res.status(201).json({
                success: true,
                message: "Inventory berhasil dibuat",
                result
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
    };

    const findAllInventory = async(req, res) => {
        try {
            const data = await inventory_service.getAllInventory();
            res.json(data);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    };

    const findOne = async(req, res) => {
        try {
            const data = await inventory_service.getInventoryById(req.params.id);
            res.json(data);
        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    };

    const updateInventory = async(req, res) => {
        try {
            const data = await inventory_service.updateInventory(req.params.id, req.body);
            res.status(201).json({
                success: true,
                message: "Data berhasil di-Update",
                data
            });
        } catch(err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
    };

    const removeInventory = async(req, res) => {
        try {
            await inventory_service.deleteInventory(req.params.id);
            res.json({
                message: "Data berhasil dihapus ! ",
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
    };

    return {
        createInventory,
        findAllInventory,
        findOne,
        updateInventory,
        removeInventory
    }
}