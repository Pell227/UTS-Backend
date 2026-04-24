const { transactions } = require("../../../models/transactions_models");

async function createTransaction(data) {
  const t = new transactions(data);
  return await t.save();
}

async function getTransactions(filter = {}, options = {}) {
  return transactions.find(filter).limit(options.limit || 10);
}

async function getTransactionById(id) {
  return transactions.findById(id);
}

async function updateTransaction(id, data) {
  return transactions.findByIdAndUpdate(id, data, { new: true });
}

async function deleteTransaction(id) {
  return transactions.findByIdAndDelete(id);
}

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
