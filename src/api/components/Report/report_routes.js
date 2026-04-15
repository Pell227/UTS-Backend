const express = require("express");

const reportrepository = require("./report_repository");

const router = express.Router();

module.exports = (app) => {
  router.use("/reports", router);
  router.get("/", getAllReports);
  router.get("/:id", getReportById);
  router.post("/", createReport);
  router.put("/:id", updateReport);
  router.delete("/:id", deleteReport);
};
