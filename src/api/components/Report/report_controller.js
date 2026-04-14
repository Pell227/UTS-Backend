const reportservuce = require("./report_service");

async function getAllReports(req, res) {
  try {
    const reports = await reportservuce.getAllReports();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getReportById(req, res) {
  try {
    const report = await reportservuce.getReportById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createReport(req, res) {
  try {
    const newReport = await reportservuce.createReport(req.body);
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateReport(req, res) {
  try {
    const updatedReport = await reportservuce.updateReport(
      req.params.id,
      req.body,
    );
    if (!updatedReport) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(updatedReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteReport(req, res) {
  try {
    const deletedReport = await reportservuce.deleteReport(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
