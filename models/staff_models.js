module.exports = (db) => {
  const Staff = db.define("staff", {
    name: String,
    position: String,
    email: String,
    phone: String,
  });
  return Staff;
};
