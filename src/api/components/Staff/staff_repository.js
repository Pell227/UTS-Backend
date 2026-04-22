const { Staff } = require("../../../models/staff_models");

async function getStaffs() {
  return Staff.find({});
}

async function getStaffById(id) {
  return Staff.findById(id);
}

async function createStaff(data) {
  return Staff.create(data);
}

async function updateStaff(id, data) {
  return Staff.findByIdAndUpdate(id, data, { new: true });
}

async function deleteStaff(id) {
  return Staff.findByIdAndDelete(id);
}

module.exports = {
  getStaffs,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
};
