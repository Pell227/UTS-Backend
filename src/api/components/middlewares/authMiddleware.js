const { verifyAccessToken } = require("../utils/jwt");
const { errorResponse } = require("../utils/response");
const authRepository = require("../repositories/authRepository");
const logger = require("../utils/logger");
 

 //Verifikasi JWT access token
 
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
 
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, {
        message: "Akses ditolak. Token tidak ditemukan.",
        statusCode: 401,
      });
    }
 
    const token = authHeader.split(" ")[1];
 
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (err) {
      const message =
        err.name === "TokenExpiredError"
          ? "Token sudah kedaluwarsa. Silakan login ulang."
          : "Token tidak valid.";
      return errorResponse(res, { message, statusCode: 401 });
    }
 
    // Ambil user dari DB untuk memastikan masih aktif
    const user = await authRepository.findById(decoded.id);
 
    if (!user) {
      return errorResponse(res, { message: "User tidak ditemukan.", statusCode: 401 });
    }
 
    if (!user.isActive) {
      return errorResponse(res, {
        message: "Akun Anda telah dinonaktifkan. Hubungi supervisor.",
        statusCode: 403,
      });
    }
 
    if (!user.isApproved) {
      return errorResponse(res, {
        message: "Akun Anda belum disetujui. Tunggu persetujuan supervisor/admin.",
        statusCode: 403,
      });
    }
 
    req.user = user;
    next();
  } catch (error) {
    logger.error("Auth middleware error:", error);
    return errorResponse(res, { message: "Terjadi kesalahan autentikasi.", statusCode: 500 });
  }
};
 

  //Izinkan hanya role tertentu
  //@param  {...string} roles - "karyawan", "supervisor", "admin"
 
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.status)) {
      return errorResponse(res, {
        message: `Akses ditolak. Hanya ${roles.join(", ")} yang diizinkan.`,
        statusCode: 403,
      });
    }
    next();
  };
};
 

 // Supervisor atau Admin saja
 
const requireSupervisorOrAdmin = authorize("supervisor", "admin");
 

  //Admin saja 
const requireAdmin = authorize("admin");
 

 // Semua role yang sudah login (karyawan, supervisor, admin)
 
const requireAnyRole = authorize("karyawan", "supervisor", "admin");
 
module.exports = {
  authenticate,
  authorize,
  requireSupervisorOrAdmin,
  requireAdmin,
  requireAnyRole,
};