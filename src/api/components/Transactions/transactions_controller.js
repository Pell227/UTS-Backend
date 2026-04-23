const transactionsservice = require("./transactions_service");
const { errorTypes, errorResponder } = require("../../../core/error");

// CREATE
const createTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionsservice.createTransaction(req.body);
    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    return next(errorResponder(errorTypes.BAD_REQUEST, error.message));
  }
};

// GET ALL
const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionsservice.getAllTransactions();
    res.status(200).json({
      success: true,
      data: transactions
    });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

// GET BY ID
const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await transactionsservice.getTransactionById(req.params.id);

    if (!transaction) {
      return next(errorResponder(errorTypes.NOT_FOUND, "Transaction not found"));
    }

    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

// UPDATE
const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionsservice.updateTransaction(
      req.params.id,
      req.body
    );

    if (!transaction) {
      return next(errorResponder(errorTypes.NOT_FOUND, "Transaction not found"));
    }

    res.status(200).json({
      success: true,
      message: "Transaction updated",
      data: transaction
    });
  } catch (error) {
    return next(errorResponder(errorTypes.BAD_REQUEST, error.message));
  }
};

// DELETE
const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionsservice.deleteTransaction(req.params.id);

    if (!transaction) {
      return next(errorResponder(errorTypes.NOT_FOUND, "Transaction not found"));
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted"
    });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};