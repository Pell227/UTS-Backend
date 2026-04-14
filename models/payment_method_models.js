module.exports = (db) => {
  const PaymentMethod = db.define("payment_method", {
    name : String,
    type : String,
    isActive : Boolean
  });
  return PaymentMethod;
};