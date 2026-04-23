module.exports = (db) => {
  const TL = db.define("transaction_list", {
    transaction_id: {
      type: String,
      required: true,
      primaryKey: true,
    },

    receipt_id: {
      type: Number,
      required: true,
      unique: true,
    },

    cashier_id: {
      type: String,
      required: true,
      unique: true,
    },

    cashier_name: {
      type: String,
      required: true,
    },

    cashier_station: {
      type: Number,
      required: true,
    },

    store_id: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    quantity: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },
  });
  return TL;
};
