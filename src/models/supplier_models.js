module.exports = (db) => {
  const supplier = db.define("supplier", {
    idsupplier: {
      type: Number,
      primaryKey: true,
      autoIncrement: true,
      require: true,
    },

    no: {
      type: String,
      require: true,
      unique: true,
    },

    nama_supplier: {
      type: String,
      require: true,
    },

    alamat: {
      type: String,
      require: true,
    },

    telepon: {
      type: String,
      require: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  });

  return supplier;
};