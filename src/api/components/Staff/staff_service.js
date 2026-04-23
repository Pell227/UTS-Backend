const staffrepository = require("./staff_repository");

async function getAllStaff() {
  return await staffrepository.getStaffs();
}

async function getStaffById(id) {
  return await staffrepository.getStaffById(id);
}

async function createstaff(data) {
  return await reportrepository.createReport(data);
}

async function updatestaff(id, data) {
  return await reportrepository.updateReport(id, data);
}

async function deletestaff(id) {
  return await reportrepository.deleteReport(id);
}

module.exports = {
  getAllStaff,
  getStaffById,
  createstaff,
  updatestaff,
  deletestaff,
};
