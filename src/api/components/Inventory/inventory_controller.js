const { errorTypes, errorResponder } = require("../../../core/error");

module.exports = (inventory_service) => {

    const createInventory = async (req, res, next) => {
        try {
            const result = await inventory_service.createInventory(req.body);

            res.status(201).json({
                success: true,
                message: "Inventory berhasil dibuat",
                result
            });
        } catch (err) {
            return next(
                errorResponder(errorTypes.BAD_REQUEST, err.message)
            );
        }
    };

    const findAllInventory = async (req, res, next) => {
        try {
            const data = await inventory_service.getAllInventory();
            res.json({
                success: true,
                data
            });
        } catch (err) {
            return next(
                errorResponder(errorTypes.SERVER, err.message)
            );
        }
    };

    const findOne = async (req, res, next) => {
        try {
            const data = await inventory_service.getInventoryById(req.params.id);

            if (!data) {
                return next(
                    errorResponder(errorTypes.NOT_FOUND, "Inventory tidak ditemukan")
                );
            }

            res.json({
                success: true,
                data
            });
        } catch (err) {
            return next(
                errorResponder(errorTypes.SERVER, err.message)
            );
        }
    };

    const updateInventory = async (req, res, next) => {
        try {
            const data = await inventory_service.updateInventory(req.params.id, req.body);

            if (!data) {
                return next(
                    errorResponder(errorTypes.NOT_FOUND, "Inventory tidak ditemukan")
                );
            }

            res.status(200).json({
                success: true,
                message: "Data berhasil di-Update",
                data
            });
        } catch (err) {
            return next(
                errorResponder(errorTypes.BAD_REQUEST, err.message)
            );
        }
    };

    const removeInventory = async (req, res, next) => {
        try {
            const data = await inventory_service.deleteInventory(req.params.id);

            if (!data) {
                return next(
                    errorResponder(errorTypes.NOT_FOUND, "Inventory tidak ditemukan")
                );
            }

            res.json({
                success: true,
                message: "Data berhasil dihapus!"
            });
        } catch (err) {
            return next(
                errorResponder(errorTypes.SERVER, err.message)
            );
        }
    };

    return {
        createInventory,
        findAllInventory,
        findOne,
        updateInventory,
        removeInventory
    };
};