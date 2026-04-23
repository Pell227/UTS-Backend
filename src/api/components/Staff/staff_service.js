const staffrepository = require("src/api/components/Staff/staff_repository");

async function getAllStaff() {
  return await staffrepository.getStaffs();
}

async function getStaffById(id) {
  return await staffrepository.getStaffById(id);
}

module.exports = {
  getAllStaff,
  getStaffById,
};
