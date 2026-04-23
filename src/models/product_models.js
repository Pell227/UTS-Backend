module.exports = (db) => {
  const product = db.define("product", {
    idproduct: {
      type: Number,
      primaryKey: true,
      autoIncrement: true,
      require: true,
    },

    name: {
      type: String,
      require: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      require: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  });

  return product;
};