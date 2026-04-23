const reportservice = require("./report_service");
const { errorTypes, errorResponder } = require("../../../core/error");

// GET ALL
async function getAllReports(req, res, next) {
  try {
    const reports = await reportservice.getAllReports();
    res.json(reports);
  } catch (error) {
    return next(
      errorResponder(errorTypes.SERVER, error.message)
    );
  }
}

// GET BY ID
async function getReportById(req, res, next) {
  try {
    const report = await reportservice.getReportById(req.params.id);

    if (!report) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Report not found")
      );
    }

    res.json(report);
  } catch (error) {
    return next(
      errorResponder(errorTypes.SERVER, error.message)
    );
  }
}

// CREATE
async function createReport(req, res, next) {
  try {
    const newReport = await reportservice.createReport(req.body);
    res.status(201).json(newReport);
  } catch (error) {
    return next(
      errorResponder(errorTypes.BAD_REQUEST, error.message)
    );
  }
}

// UPDATE
async function updateReport(req, res, next) {
  try {
    const updatedReport = await reportservice.updateReport(
      req.params.id,
      req.body
    );

    if (!updatedReport) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Report not found")
      );
    }

    res.json(updatedReport);
  } catch (error) {
    return next(
      errorResponder(errorTypes.BAD_REQUEST, error.message)
    );
  }
}

// DELETE
async function deleteReport(req, res, next) {
  try {
    const deletedReport = await reportservice.deleteReport(req.params.id);

    if (!deletedReport) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Report not found")
      );
    }

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    return next(
      errorResponder(errorTypes.SERVER, error.message)
    );
  }
}

module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};