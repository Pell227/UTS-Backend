module.exports = (db) => {
  const Staff = db.define("staff", {
    NIP: {
      type: Number(20),
      primaryKey: true,
      autoIncrement: true,
      require: true,
    },

    names: {
      type: String(50),
      require: true,
    },

    position: {
      type: String(30),
      require: true,
    },

    email: {
      type: String(50),
      require: true,
      unique: true,
    },

    phone: {
      type: Number(15),
      require: true,
    },
  });
  return Staff;
};
