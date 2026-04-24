const { promo } = require("../../../models/discount_model");

// GET ALL
async function getPromos() {
  return promo.find({});
}

// GET BY ID
async function getPromoById(id) {
  return promo.findById(id);
}

// CREATE
async function createPromo(data) {
  const newData = new promo(data);
  return await newData.save();
}

async function findPromoByCode(code) {
  return promo.findOne({ code, isActive: true });
}

// UPDATE
async function updatePromo(id, data) {
  return promo.findByIdAndUpdate(id, data, { new: true });
}

// DELETE
async function deletePromo(id) {
  return promo.findByIdAndDelete(id);
}

module.exports = {
  getPromos,
  getPromoById,
  createPromo,
  findPromoByCode,
  updatePromo,
  deletePromo,
};
