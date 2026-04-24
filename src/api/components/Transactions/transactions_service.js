const transactionsrepository = require("./transactions_repository");

async function createTransaction(data) {
  if (!data || Object.keys(data).length == 0) {
    throw new Error("Transaction data is required");
  }

  return transactionsrepository.createTransaction(data);
}

async function getAllTransactions(filter = {}, options = {}) {
  return transactionsrepository.getTransactions(filter, options);
}

async function getTransactionById(id) {
  if (!id) {
    throw new Error("Transaction ID is required");
  }

  const transaction = await transactionsrepository.getTransactionById(id);

  if (!transaction) {
    throw new Error("Transaction does not exist");
  }

  return transaction;
}

async function updateTransaction(id, data) {
  if (!id) {
    throw new Error("Transaction ID is required");
  }

  if (!data || Object.keys(data).length == 0) {
    throw new Error("Update data is required");
  }

  const updated = await transactionsrepository.updateTransaction(id, data);

  if (!updated) {
    throw new Error("Transaction does not exist");
  }

  return updated;
}

async function deleteTransaction(id) {
  if (!id) {
    throw new Error("Transaction ID is required");
  }

  const deleted = await transactionsrepository.deleteTransaction(id);

  if (!deleted) {
    throw new Error("Transaction does not exist");
  }

  return deleted;
}

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
