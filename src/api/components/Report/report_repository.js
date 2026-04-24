const { reports } = require("../../../models/report_models");

async function getReports() {
  return reports.find({});
}

async function getReportById(id) {
  return reports.findById(id);
}

async function createReport(data) {
  return reports.create(data);
}

async function updateReport(id, data) {
  return reports.findByIdAndUpdate(id, data, { new: true });
}

async function deleteReport(id) {
  return reports.findByIdAndDelete(id);
}

module.exports = {
  getReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
