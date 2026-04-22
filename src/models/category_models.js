module.exports = (db) => {
  const Category = db.define("category", {
    id: {
      type: Number,
      require: true,
    },
    nameK: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  });
  return Category;
};
