const successResponse = (res, { message = "Berhasil", data = null, statusCode = 200 } = {}) => {
  const response = { success: true, message };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};
 
/**
 * Response error standar
 */
const errorResponse = (res, { message = "Terjadi kesalahan", errors = null, statusCode = 400 } = {}) => {
  const response = { success: false, message };
  if (errors) response.errors = errors;
  return res.status(statusCode).json(response);
};
 
module.exports = { successResponse, errorResponse };