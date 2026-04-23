const { Staff } = require("../../../models/staff_models");

async function getStaffs() {
  return await Staff.find({});
}

async function getStaffById(id) {
  return await Staff.findById(id);
}

async function createStaff(data) {
  return await Staff.create(data);
}

async function updateStaff(id, data) {
  return await Staff.findByIdAndUpdate(id, data, { new: true });
}

async function deleteStaff(id) {
  return await Staff.findByIdAndDelete(id);
}

module.exports = {
  getStaffs,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
};
