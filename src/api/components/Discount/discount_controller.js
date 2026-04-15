const service = require("../services/promo_service");

// GET ALL
const getPromos = async (req, res) => {
  try {
    const data = await service.getPromos();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
const getPromoById = async (req, res) => {
  try {
    const data = await service.getPromoById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Promo not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
const createPromo = async (req, res) => {
  try {
    const data = await service.createPromo(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE
const updatePromo = async (req, res) => {
  try {
    const data = await service.updatePromo(req.params.id, req.body);

    if (!data) {
      return res.status(404).json({ message: "Promo not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
const deletePromo = async (req, res) => {
  try {
    const data = await service.deletePromo(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Promo not found" });
    }

    res.json({ message: "Promo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPLY PROMO 🔥
const applyPromo = async (req, res) => {
  try {
    const { code, amount } = req.body;

    const result = await service.applyPromo(code, amount);

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPromos,
  getPromoById,
  createPromo,
  updatePromo,
  deletePromo,
  applyPromo
};