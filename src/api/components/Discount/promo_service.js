const repo = require("./promo_repository");

const applyPromo = async (code, amount) => {
  const promos = await repo.getPromos();
  const promo = promos.find((p) => p.code === code && p.isActive);

  if (!promo) {
    throw new Error("Promo tidak valid");
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

  return {
    discountAmount,
    finalPrice,
  };
};
// GET ALL
const getPromos = async () => {
  return await repo.getPromos();
};

// GET BY ID
const getPromoById = async (id) => {
  return await repo.getPromoById(id);
};

// CREATE
const createPromo = async (data) => {
  const { code, discount, type } = data;

  if (!code || !discount || !type) {
    throw new Error("code, discount, dan type wajib diisi");
  }

  return await repo.createPromo(data);
};

// UPDATE
const updatePromo = async (id, data) => {
  return await repo.updatePromo(id, data);
};

// DELETE
const deletePromo = async (id) => {
  return await repo.deletePromo(id);
};

module.exports = {
  getPromos,
  getPromoById,
  createPromo,
  updatePromo,
  deletePromo,
  applyPromo,
};
