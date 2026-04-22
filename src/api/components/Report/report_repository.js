const { report } = require("../../../models/report_models");

async function getReports() {
  return report.find({});
}

async function getReportById(id) {
  return report.findById(id);
}

async function createReport(data) {
  return report.create(data);
}

async function updateReport(id, data) {
  return report.findByIdAndUpdate(id, data, { new: true });
}

async function deleteReport(id) {
  return report.findByIdAndDelete(id);
}

module.exports = {
  getReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
