const express = require("express");

const staffcontroller = require("../controller/staff_controller");

const router = express.Router();

module.exports = (app) => {
  app.use("/staff", router);

  router.get("/", staffcontroller.getAllStaff);
  router.get("/:id", staffcontroller.getStaffById);
  router.post("/", staffcontroller.createStaff);
  router.put("/:id", staffcontroller.updateStaff);
  router.delete("/:id", staffcontroller.deleteStaff);
};
