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

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
const deletePaymentMethod = async (req, res) => {
  try {
    const data = await service.deletePaymentMethod(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH STATUS
const updateStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const data = await service.updateStatus(req.params.id, isActive);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
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