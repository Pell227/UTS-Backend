const { staff } = require("../models");

async function getStaffs() {
  return staff.find({});
}

async function getStaffById(id) {
  return staff.findById(id);
}

module.exports = {
  getStaffs,
  getStaffById,
};
