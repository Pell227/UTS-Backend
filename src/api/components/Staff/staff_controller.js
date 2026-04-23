const StaffService = require("./staff_service");
const logger = require("../utils/logger");
const { errorTypes, errorResponder } = require("../../../core/error");

const getAllStaff = async (req, res, next) => {
  try {
    const staff = await StaffService.getAllStaff();
    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

const getStaffById = async (req, res, next) => {
  try {
    const staff = await StaffService.getStaffById(req.params.id);

    if (!staff) {
      return next(errorResponder(errorTypes.NOT_FOUND, "Staff not found"));
    }
    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

const createStaff = async (req, res, next) => {
  try {
    const newStaff = await StaffService.createstaff(req.body);
    res.status(201).json({
      success: true,
      message: "Staff berhasil dibuat",
      data: newStaff,
    });
  } catch (error) {
    return next(errorResponder(errorTypes.BAD_REQUEST, error.message));
  }
};

const updateStaff = async (req, res, next) => {
  try {
    const staff = await StaffService.updatestaff(req.params.id, req.body);

    if (!staff) {
      return next(errorResponder(errorTypes.NOT_FOUND, "Staff not found"));
    }
    res.status(200).json({
      success: true,
      message: "Staff berhasil diupdate",
      data: staff,
    });
  } catch (error) {
    return next(errorResponder(errorTypes.BAD_REQUEST, error.message));
  }
};

const deleteStaff = async (req, res, next) => {
  try {
    const staff = await StaffService.deletestaff(req.params.id);

    if (!staff) {
      return next(errorResponder(errorTypes.NOT_FOUND, "Staff not found"));
    }
    res.status(200).json({ success: true, message: "Staff deleted" });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

module.exports = {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
};
