const staffrepository = require("./staff_repository");

async function getAllStaff() {
  return await staffrepository.getStaffs();
}

async function getStaffById(id) {
  return await staffrepository.getStaffById(id);
}

async function createstaff(data) {
  return await staffrepository.createStaff(data);
}

async function updatestaff(id, data) {
  return await staffrepository.updateStaff(id, data);
}

async function deletestaff(id) {
  return await staffrepository.deleteStaff(id);
}

module.exports = {
  getAllStaff,
  getStaffById,
  createstaff,
  updatestaff,
  deletestaff,
};
