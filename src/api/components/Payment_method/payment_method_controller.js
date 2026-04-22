<<<<<<< HEAD:src/api/components/payment_method/payment_method_controller.js
const service = require("../services/payment_method_service");
const { errorTypes, errorResponder } = require("../../core/error");

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
=======

const service = require("../../payment_method/payment_method_service");

// GET ALL + FILTER
const getAllPaymentMethods = async (req, res) => {
  try {
    const data = await service.getPaymentMethods(req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
const getPaymentMethodById = async (req, res) => {
  try {
    const data = await service.getPaymentMethodById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
const createPaymentMethod = async (req, res) => {
  try {
    const data = await service.createPaymentMethod(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE
const updatePaymentMethod = async (req, res) => {
  try {
    const data = await service.updatePaymentMethod(req.params.id, req.body);
>>>>>>> af4e9424f06f8a4a06efe22f26b4e34f830ffc98:src/api/components/Payment_method/payment_method_controller.js

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

<<<<<<< HEAD:src/api/components/payment_method/payment_method_controller.js
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
=======
// DELETE
const deletePaymentMethod = async (req, res) => {
  try {
    const data = await service.deletePaymentMethod(req.params.id);
>>>>>>> af4e9424f06f8a4a06efe22f26b4e34f830ffc98:src/api/components/Payment_method/payment_method_controller.js

    if (!data) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Payment method not found")
      );
    }

<<<<<<< HEAD:src/api/components/payment_method/payment_method_controller.js
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
=======
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH STATUS
const updateStatus = async (req, res) => {
>>>>>>> af4e9424f06f8a4a06efe22f26b4e34f830ffc98:src/api/components/Payment_method/payment_method_controller.js
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