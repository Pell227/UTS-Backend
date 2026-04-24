const TLservice = require("./TL_service");
const { errorTypes, errorResponder } = require("../../../core/error");
const logger = require("../utils/logger");

// CREATE
const createList = async (req, res, next) => {
  try {
    const list = await TLservice.createlist(req.body);

    res.status(201).json({
      success: true,
      data: list,
    });
    logger.info(`List: ${list.name || list.id} dari ${req.ip}`);
  } catch (error) {
    logger.error("Register error:", error);
    return next(errorResponder(errorTypes.BAD_REQUEST, error.message));
  }
};

// GET ALL
const getAllList = async (req, res, next) => {
  try {
    const lists = await TLservice.getAllList(req.query);

    res.status(200).json({
      success: true,
      data: lists,
    });
    logger.info(`List: ${list.name || list.id} dari ${req.ip}`);
  } catch (error) {
    logger.error("Register error:", error);
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

// GET BY ID
const getListById = async (req, res, next) => {
  try {
    const list = await TLservice.getListById(req.params.id);

    if (!list) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Transaction list not found"),
      );
    }

    res.status(200).json({
      success: true,
      data: list,
    });
    logger.info(`List: ${list.name || list.id} dari ${req.ip}`);
  } catch (error) {
    logger.error("Register error:", error);
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

// UPDATE
const updateList = async (req, res, next) => {
  try {
    const updatedList = await TLservice.updateList(req.params.id, req.body);

    if (!updatedList) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Transaction list not found"),
      );
    }

    res.status(200).json({
      success: true,
      data: updatedList,
    });
    logger.info(`List: ${list.name || list.id} dari ${req.ip}`);
  } catch (error) {
    logger.error("update error:", error);
    return next(errorResponder(errorTypes.BAD_REQUEST, error.message));
  }
};

// DELETE
const deleteList = async (req, res, next) => {
  try {
    const deleted = await TLservice.deleteList(req.params.id);

    if (!deleted) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Transaction list not found"),
      );
    }

    res.status(200).json({
      success: true,
      message: "Transaction list deleted",
    });
    logger.info(`List: ${list.name || list.id} dari ${req.ip}`);
  } catch (error) {
    logger.error("delete error:", error);
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

module.exports = {
  createList,
  getAllList,
  getListById,
  updateList,
  deleteList,
};
