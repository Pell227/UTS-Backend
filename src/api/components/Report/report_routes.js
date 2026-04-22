const express = require("express");

const reportcontroller = require("./report_controller");

const router = express.Router();

module.exports = (app) => {
  app.use("/report", router);

  router.get("/", reportcontroller.getAllReports);
  router.get("/:id", reportcontroller.getReportById);
  router.post("/", reportcontroller.createReport);
  router.put("/:id", reportcontroller.updateReport);
  router.delete("/:id", reportcontroller.deleteReport);
};
