const inventoryService = require("./inventory_service");
const { errorTypes, errorResponder } = require("../../../core/error");

const createInventory = async (req, res, next) => {
  try {
    const result = await inventoryService.createInventory(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "Inventory berhasil dibuat",
        data: result,
      });
  } catch (err) {
    return next(errorResponder(errorTypes.BAD_REQUEST, err.message));
  }
};

const findAllInventory = async (req, res, next) => {
  try {
    const data = await inventoryService.getAllInventory();
    res.json({ success: true, data });
  } catch (err) {
    return next(errorResponder(errorTypes.SERVER, err.message));
  }
};

const findOne = async (req, res, next) => {
  try {
    const data = await inventoryService.getInventoryById(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    return next(errorResponder(errorTypes.NOT_FOUND, err.message));
  }
};

const updateInventory = async (req, res, next) => {
  try {
    const data = await inventoryService.updateInventory(
      req.params.id,
      req.body,
    );
    res
      .status(200)
      .json({ success: true, message: "Data berhasil di-Update", data });
  } catch (err) {
    return next(errorResponder(errorTypes.BAD_REQUEST, err.message));
  }
};

const removeInventory = async (req, res, next) => {
  try {
    await inventoryService.deleteInventory(req.params.id);
    res.json({ success: true, message: "Data berhasil dihapus!" });
  } catch (err) {
    return next(errorResponder(errorTypes.NOT_FOUND, err.message));
  }
};

module.exports = {
  createInventory,
  findAllInventory,
  findOne,
  updateInventory,
  removeInventory,
};
