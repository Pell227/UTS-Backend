module.exports = (db) => {
  const Promo = db.define("promo", {
    code: {
      type: String,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    maxDiscount: {
      type: Number,
      require: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  });
  return Promo;
};
