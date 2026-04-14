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
    const newData = new PaymentMethod(req.body);
    const saved = await newData.save();

    res.status(201).json(saved);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
};