const PaymentMethod = require("../models/payment_method_model");

const getAllPaymentMethods = async (req, res) => {
  try {
    const data = await PaymentMethod.find();
    res.status(200).json(data);
  } 
  catch (error) {
    res.status(500).json({ message : error.message });
  }
};

const getPaymentMethodById = async (req, res) => {
  try {
    const data = await PaymentMethod.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message : "Data not found" });
    }

    res.json(data);
  } 
  catch (error) {
    res.status(500).json({ message : error.message });
  }
};

const createPaymentMethod = async (req, res) => {
  try {
    const { name, type, provider, isActive } = req.body;

    const newData = new PaymentMethod({
      name,
      type,
      provider,
      isActive
    });

    const saved = await newData.save();

    res.status(201).json(saved);
  } 
  catch (error) {
    res.status(400).json({ message : error.message });
  }
};

const updatePaymentMethod = async (req, res) => {
  try {
    const data = await PaymentMethod.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePaymentMethod = async (req, res) => {
  try {
    const data = await PaymentMethod.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPaymentMethodsByType = async (req, res) => {
  try {
    const { type } = req.query;

    const data = await PaymentMethod.find(type ? { type } : {});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const data = await PaymentMethod.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

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
  getPaymentMethodsByType,
  updateStatus
};