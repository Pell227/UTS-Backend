const Staff = require("./staff_service");
const { errorTypes, errorResponder } = require("../../../core/error");

const getAllStaff = async (req, res, next) => {
  try {
    const staff = await Staff.find();
    res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

// GET BY ID
const getStaffById = async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return next(errorResponder(errorTypes.NOT_FOUND, "Staff not found"));
    }

    res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

// CREATE
const createStaff = async (req, res, next) => {
  try {
    const { NIP, names, position, email, phone } = req.body;
    const newStaff = await staff.save();

    res.status(201).json({
      success: true,
      message: "Staff berhasil dibuat",
      data: newStaff,
    });
  } catch (error) {
    return next(errorResponder(errorTypes.BAD_REQUEST, error.message));
  }
};

// UPDATE
const updateStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

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

// DELETE
const deleteStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);

    if (!staff) {
      return next(errorResponder(errorTypes.NOT_FOUND, "Staff not found"));
    }

    res.status(200).json({
      success: true,
      message: "Staff deleted",
    });
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
