const repo = require("../repository/promo_repository");

// GET ALL
const getPromos = async (req, res) => {
  try {
    const data = await repo.getPromos();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPromoById = async (req, res) => {
  try {
    const data = await repo.getPromoById(req.params.id);

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
    const { code, discount, type, maxDiscount, isActive } = req.body;

    if (!code || !discount || !type) {
      return res.status(400).json({
        message: "code, discount, dan type wajib diisi",
      });
    }

    const data = await repo.createPromo({
      code,
      discount,
      type,
      maxDiscount,
      isActive,
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE
const updatePromo = async (req, res) => {
  try {
    const data = await repo.updatePromo(req.params.id, req.body);

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
    const data = await repo.deletePromo(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Promo not found" });
    }

    res.json({ message: "Promo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPLY PROMO
const applyPromo = async (req, res) => {
  try {
    const { code, amount } = req.body;

    const promos = await repo.getPromos();
    const promo = promos.find((p) => p.code === code && p.isActive);

    if (!promo) {
      return res.status(404).json({ message: "Promo tidak valid" });
    }

    let discountAmount = 0;

    if (promo.type === "percentage") {
      discountAmount = (promo.discount / 100) * amount;

      if (promo.maxDiscount) {
        discountAmount = Math.min(discountAmount, promo.maxDiscount);
      }
    } else {
      discountAmount = promo.discount;
    }

    const finalPrice = amount - discountAmount;

    res.json({
      discountAmount,
      finalPrice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPromos,
  getPromoById,
  createPromo,
  updatePromo,
  deletePromo,
  applyPromo,
};
