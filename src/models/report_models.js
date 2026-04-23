module.exports = (db) => {
  const report = db.define("report", {
    idreport: {
      type: Number(20),
      primaryKey: true,
      autoIncrement: true,
      require: true,
    },

    title: {
      type: String(50),
      require: true,
    },

    start_date: {
      type: Date,
      require: true,
    },

    end_date: {
      type: Date,
      require: true,
    },
  });
};
