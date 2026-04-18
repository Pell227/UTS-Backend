const rateLimit = require("express-rate-limit");
const { errorResponse } = require("../utils/response");
 

 // Rate limiter khusus untuk endpoint login
 // Lebih ketat karena ini pintu masuk utama
 
const loginLimiter = rateLimit({
  windowMs: parseInt(process.env.LOGIN_WINDOW_MINUTES || 15) * 60 * 1000,
  max: parseInt(process.env.LOGIN_MAX_ATTEMPTS || 20),
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Rate limit per IP
    return req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.ip;
  },
  handler: (req, res) => {
    return errorResponse(res, {
      message: "Terlalu banyak percobaan login dari IP ini. Coba lagi nanti.",
      statusCode: 429,
    });
  },
});
 

 // Rate limiter umum untuk semua API
 
const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 menit
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, {
      message: "Terlalu banyak request. Coba lagi nanti.",
      statusCode: 429,
    });
  },
});
 

 // Rate limiter untuk registrasi
 
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 jam
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, {
      message: "Terlalu banyak pendaftaran dari IP ini. Coba lagi dalam 1 jam.",
      statusCode: 429,
    });
  },
});
 
module.exports = { loginLimiter, generalLimiter, registerLimiter };