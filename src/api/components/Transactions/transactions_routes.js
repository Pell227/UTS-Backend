const express = require("express");

const transactionscontroller = require("./transactions_controller");

const router = express.Router();

module.exports = (app) => {
  app.use("/transactions", router);

  router.get("/", transactionscontroller.getAllTransactions);
  router.get("/:id", transactionscontroller.getTransactionById);
  router.post("/", transactionscontroller.createTransaction);
  router.put("/:id", transactionscontroller.updateTransaction);
  router.delete("/:id", transactionscontroller.deleteTransaction);
};
