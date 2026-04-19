const reportrepository = require("./report_repository");

async function getAllReports() {
  return await reportrepository.getReports();
}

async function getReportById(id) {
  return await reportrepository.getReportById(id);
}

async function createReport(data) {
  return await reportrepository.createReport(data);
}

async function updateReport(id, data) {
  return await reportrepository.updateReport(id, data);
}

async function deleteReport(id) {
  return await reportrepository.deleteReport(id);
}

module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
