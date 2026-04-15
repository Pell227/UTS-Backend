module.exports = (db) => {
  const Promo = db.define("promo", {

    code : {
      type : String,
      require : true
    },
    discount : {
      type : Number, // nilai diskon
      require : true
    },
    type : {
      type : String, // percentage / fixed
      require : true
    },
    maxDiscount : {
      type : Number,
      require : false
    },
    isActive : {
      type : Boolean,
      default : true
    }
  });
  return Promo;
};