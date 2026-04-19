const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    code: err.code || "UNKNOWN_ERROR",
    description: err.description || ""
  });
};

module.exports = errorHandler;