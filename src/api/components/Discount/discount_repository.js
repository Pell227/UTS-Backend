const { promo } = require("../models");

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
  updatePromo,
  deletePromo
};