module.exports = (db) => {
  const Category = db.define("category", {
    name: String,
    type: String,
    description: String,
    status: String,
  });
  return Category;
};