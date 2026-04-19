const transactionsrepository = require("./transactions_repository");

async function createTransaction(orderId) {
    if (!orderId) {
        throw new Error("Order ID is required");
    }

    return transactionsrepository.createOrder(orderId);
}

async function getAllTransactions(filter = {}, options = {}){
    return await transactionsrepository.getTransactions(filter, options);
}

async function getTransactionById(id) {
    return await transactionsrepository.getTransactionById(id);
}

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction
};
