const { transactions } = require("../../../../models/transactions_models");

async function createOrder(id) {
    return transactions.create({ order_id: id });
}

async function getTransactions(filter = {}, options = {}) {
    return transactions.find(filter).limit(options.limit || 10);
}

async function getTransactionById(id) {
    try {
        const transaction = await transactions.findById(id);

        if (!transaction) {
            throw new Error("Transaction not found");
        }

        return transaction;
    } catch (err) {
        throw new Error("Failed to get transaction: " + err.message);
    }
}

async function updateTransaction(id, data) {
    return transactions.findByIdAndUpdate(id, data, { new: true });
}

async function deleteTransaction(id) {
    return transactions.findByIdAndDelete(id);
}

module.exports = {
    createOrder,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
};