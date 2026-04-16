module.exports = (db) => {
  const PaymentMethod = db.define("payment_method", {
    
    name_pm : {
      type : String,
      require : true
    },

    type_pm : {
      type : String, // e-wallet, bank, cash
      require : true
    },

    provider_pm : {
      type : String, // QRIS, Virtual Account, dll
      require : false
    },

    isActive_pm : {
      type : Boolean,
      default : true
    }

  });
  return PaymentMethod;
};