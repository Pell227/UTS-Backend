const service = require("./payment_method_service");
const staffroutes = require("./payment_method_routes")
const { errorTypes, errorResponder } = require("../../../core/error");

// GET ALL + FILTER
const getAllPaymentMethods = async (req, res, next) => {
  try {
    const data = await service.getPaymentMethods(req.query);
    res.json(data);
  } catch (error) {
    return next(
      errorResponder(errorTypes.SERVER, error.message)
    );
  }
};

// GET BY ID
const getPaymentMethodById = async (req, res, next) => {
  try {
    const data = await service.getPaymentMethodById(req.params.id);

    if (!data) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Payment method not found")
      );
    }

    res.json(data);
  } catch (error) {
    return next(
      errorResponder(errorTypes.SERVER, error.message)
    );
  }
};

// CREATE
const createPaymentMethod = async (req, res, next) => {
  try {
    const data = await service.createPaymentMethod(req.body);
    res.status(201).json(data);
  } catch (error) {
    return next(
      errorResponder(errorTypes.BAD_REQUEST, error.message)
    );
  }
};

// UPDATE
const updatePaymentMethod = async (req, res, next) => {
  try {
    const data = await service.updatePaymentMethod(req.params.id, req.body);

    if (!data) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Payment method not found")
      );
    }

    res.json(data);
  } catch (error) {
    return next(
      errorResponder(errorTypes.BAD_REQUEST, error.message)
    );
  }
};

// DELETE
const deletePaymentMethod = async (req, res, next) => {
  try {
    const data = await service.deletePaymentMethod(req.params.id);

    if (!data) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Payment method not found")
      );
    }

    res.json({ message: "Payment method deleted" });
  } catch (error) {
    return next(
      errorResponder(errorTypes.SERVER, error.message)
    );
  }
};

// UPDATE STATUS
const updateStatus = async (req, res, next) => {
  try {
    const { isActive } = req.body;

    const data = await service.updateStatus(req.params.id, isActive);

    if (!data) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Payment method not found")
      );
    }

    res.json(data);
  } catch (error) {
    return next(
      errorResponder(errorTypes.BAD_REQUEST, error.message)
    );
  }
};

module.exports = {
  getAllPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  updateStatus
};