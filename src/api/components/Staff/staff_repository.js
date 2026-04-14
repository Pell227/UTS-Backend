const { staff } = require("../../../../models");

async function getStaffs() {
  return staff.find({});
}

async function getStaffById(id) {
  return staff.findById(id);
}

async function createStaff(data) {
  return staff.create(data);
}

async function updateStaff(id, data) {
  return staff.findByIdAndUpdate(id, data, { new: true });
}

async function deleteStaff(id) {
  return staff.findByIdAndDelete(id);
}

module.exports = {
  getStaffs,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
};
