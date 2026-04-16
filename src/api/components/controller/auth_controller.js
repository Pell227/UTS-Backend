// controllers/authController.js
const authRepository = require("../repositories/authRepository");
const { generateTokenPair, verifyRefreshToken } = require("../utils/jwt");
const { successResponse, errorResponse } = require("../utils/response");
const logger = require("../utils/logger");

//Helper 
const getClientIp = (req) => {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown"
  );
};

const getUserAgent = (req) => req.headers["user-agent"] || "unknown";

//REGISTER
//POST /api/auth/register || Registrasi user baru - butuh approval sebelum bisa login
const register = async (req, res) => {
  try {
    const { nama, username, email, password, status, nip, noHp } = req.body;
    const ip = getClientIp(req);

    // Cek duplikat username
    if (await authRepository.isUsernameTaken(username)) {
      return errorResponse(res, {
        message: "Username sudah digunakan, pilih username lain.",
        statusCode: 409,
      });
    }

    // Cek duplikat email
    if (await authRepository.isEmailTaken(email)) {
      return errorResponse(res, {
        message: "Email sudah terdaftar, gunakan email lain atau login.",
        statusCode: 409,
      });
    }

    //Cek duplikat NIP
    if (nip && (await authRepository.isNipTaken(nip))) {
      return errorResponse(res, { message: "NIP sudah terdaftar.", statusCode: 409 });
    }

    // Jika ini user pertama di sistem, jadikan admin & langsung approved
    const totalUsers = await authRepository.countUsers();
    const isFirstUser = totalUsers === 0;

    const newUser = await authRepository.createUser({
      nama,
      username,
      email,
      password,
      status: isFirstUser ? "admin" : status,
      nip: nip || null,
      noHp: noHp || null,
      isApproved: isFirstUser, // User pertama langsung approved
      isActive: true,
    });

    // Simpan audit log
    await authRepository.createAuditLog({
      userId: newUser.id,
      action: "REGISTER",
      detail: isFirstUser
        ? "User pertama — otomatis jadi admin & disetujui"
        : "Menunggu persetujuan supervisor/admin",
      ipAddress: ip,
      userAgent: getUserAgent(req),
      username: newUser.username,
    });

    logger.info(`Registrasi baru: ${newUser.username} (${newUser.status}) dari ${ip}`);

    const message = isFirstUser
      ? "Registrasi berhasil! Akun admin pertama langsung aktif."
      : "Registrasi berhasil! Akun Anda menunggu persetujuan supervisor/admin sebelum bisa login.";

    return successResponse(res, {
      message,
      data: {
        id: newUser.id,
        nama: newUser.nama,
        username: newUser.username,
        email: newUser.email,
        status: newUser.status,
        isApproved: newUser.isApproved,
      },
      statusCode: 201,
    });
  } catch (error) {
    logger.error("Register error:", error);

    // Handle Sequelize validation errors
    if (error.name === "SequelizeValidationError") {
      return errorResponse(res, {
        message: error.errors[0].message,
        statusCode: 422,
      });
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      return errorResponse(res, {
        message: "Data sudah terdaftar. Cek username/email/NIP.",
        statusCode: 409,
      });
    }

    return errorResponse(res, { message: "Gagal mendaftarkan akun.", statusCode: 500 });
  }
};



//LOGIN || POST /api/auth/login || Login dengan username/email + password
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const ip = getClientIp(req);
    const ua = getUserAgent(req);

    // Cari user
    const user = await authRepository.findByUsernameOrEmail(identifier);

    if (!user) {
      // Jangan kasih tahu apakah user ada atau tidak (security)
      await authRepository.createAuditLog({
        action: "LOGIN_FAILED",
        detail: `User tidak ditemukan: ${identifier}`,
        ipAddress: ip,
        userAgent: ua,
        username: identifier,
      });
      return errorResponse(res, {
        message: "Username/email atau password salah.",
        statusCode: 401,
      });
    }

    // Cek akun terkunci
    if (user.isLocked()) {
      const lockRemaining = Math.ceil((user.lockedUntil - new Date()) / 60000);
      await authRepository.createAuditLog({
        userId: user.id,
        action: "LOGIN_FAILED",
        detail: `Akun terkunci. Sisa ${lockRemaining} menit`,
        ipAddress: ip,
        userAgent: ua,
        username: user.username,
      });
      return errorResponse(res, {
        message: `Akun terkunci karena terlalu banyak percobaan. Coba lagi dalam ${lockRemaining} menit.`,
        statusCode: 423,
      });
    }

    // Cek akun aktif
    if (!user.isActive) {
      return errorResponse(res, {
        message: "Akun Anda telah dinonaktifkan. Hubungi supervisor.",
        statusCode: 403,
      });
    }

    // Cek sudah approved
    if (!user.isApproved) {
      return errorResponse(res, {
        message: "Akun Anda belum disetujui oleh supervisor/admin. Harap tunggu.",
        statusCode: 403,
      });
    }

    // Verifikasi password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      await user.incrementLoginAttempts();

      const remaining = Math.max(0, 5 - user.loginAttempts);
      await authRepository.createAuditLog({
        userId: user.id,
        action: "LOGIN_FAILED",
        detail: `Password salah. Sisa percobaan: ${remaining}`,
        ipAddress: ip,
        userAgent: ua,
        username: user.username,
      });

      if (user.isLocked()) {
        return errorResponse(res, {
          message: "Terlalu banyak percobaan login. Akun dikunci 15 menit.",
          statusCode: 423,
        });
      }

      return errorResponse(res, {
        message: `Username/email atau password salah. Sisa percobaan: ${remaining}`,
        statusCode: 401,
      });
    }

    //Login berhasil
    const { accessToken, refreshToken } = generateTokenPair(user);

    // Simpan refresh token & update last login
    await authRepository.updateRefreshToken(user.id, refreshToken);
    await authRepository.updateLastLogin(user.id, ip);

    await authRepository.createAuditLog({
      userId: user.id,
      action: "LOGIN_SUCCESS",
      detail: `Login berhasil dari ${ip}`,
      ipAddress: ip,
      userAgent: ua,
      username: user.username,
    });

    logger.info(`Login berhasil: ${user.username} (${user.status}) dari ${ip}`);

    return successResponse(res, {
      message: "Login berhasil!",
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          nama: user.nama,
          username: user.username,
          email: user.email,
          status: user.status,
          nip: user.nip,
        },
        expiresIn: process.env.JWT_EXPIRES_IN || "8h",
      },
    });
  } catch (error) {
    logger.error("Login error:", error);
    return errorResponse(res, { message: "Gagal melakukan login.", statusCode: 500 });
  }
};



//LOGOUT || POST /api/auth/logout || Hapus refresh token dari DB
const logout = async (req, res) => {
  try {
    const user = req.user;
    const ip = getClientIp(req);

    await authRepository.clearRefreshToken(user.id);

    await authRepository.createAuditLog({
      userId: user.id,
      action: "LOGOUT",
      detail: "Logout berhasil",
      ipAddress: ip,
      userAgent: getUserAgent(req),
      username: user.username,
    });

    logger.info(`Logout: ${user.username} dari ${ip}`);

    return successResponse(res, { message: "Logout berhasil." });
  } catch (error) {
    logger.error("Logout error:", error);
    return errorResponse(res, { message: "Gagal logout.", statusCode: 500 });
  }
};

//REFRESH TOKEN ||  POST /api/auth/refresh-token || Dapatkan access token baru dengan refresh token
const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch {
      return errorResponse(res, { message: "Refresh token tidak valid.", statusCode: 401 });
    }

    const user = await authRepository.findByRefreshToken(token);
    if (!user || user.id !== decoded.id) {
      return errorResponse(res, { message: "Refresh token tidak valid.", statusCode: 401 });
    }

    if (!user.isActive || !user.isApproved) {
      return errorResponse(res, { message: "Akun tidak aktif atau belum disetujui.", statusCode: 403 });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokenPair(user);
    await authRepository.updateRefreshToken(user.id, newRefreshToken);

    await authRepository.createAuditLog({
      userId: user.id,
      action: "TOKEN_REFRESHED",
      detail: "Access token diperbarui",
      ipAddress: getClientIp(req),
      userAgent: getUserAgent(req),
      username: user.username,
    });

    return successResponse(res, {
      message: "Token berhasil diperbarui.",
      data: {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn: process.env.JWT_EXPIRES_IN || "8h",
      },
    });
  } catch (error) {
    logger.error("Refresh token error:", error);
    return errorResponse(res, { message: "Gagal memperbarui token.", statusCode: 500 });
  }
};

//PROFILE || GET /api/auth/profile || Ambil data profil user yang sedang login
const getProfile = async (req, res) => {
  try {
    const user = await authRepository.findById(req.user.id);
    return successResponse(res, {
      message: "Profil berhasil diambil.",
      data: user.toSafeJSON(),
    });
  } catch (error) {
    logger.error("Get profile error:", error);
    return errorResponse(res, { message: "Gagal mengambil profil.", statusCode: 500 });
  }
};

//CHANGE PASSWORD || PUT /api/auth/change-password
const changePassword = async (req, res) => {
  try {
    const { passwordLama, passwordBaru } = req.body;
    const user = req.user;

    const isValid = await user.comparePassword(passwordLama);
    if (!isValid) {
      return errorResponse(res, { message: "Password lama tidak sesuai.", statusCode: 400 });
    }

    user.password = passwordBaru;
    await user.save();

    await authRepository.clearRefreshToken(user.id);

    await authRepository.createAuditLog({
      userId: user.id,
      action: "PASSWORD_CHANGED",
      detail: "Password berhasil diubah, semua sesi dihapus",
      ipAddress: getClientIp(req),
      userAgent: getUserAgent(req),
      username: user.username,
    });

    return successResponse(res, {
      message: "Password berhasil diubah. Silakan login ulang.",
    });
  } catch (error) {
    logger.error("Change password error:", error);
    return errorResponse(res, { message: "Gagal mengubah password.", statusCode: 500 });
  }
};

//USER MANAGEMENT (Supervisor/Admin  || GET /api/auth/users/pending ||Daftar user menunggu approval
const getPendingUsers = async (req, res) => {
  try {
    const users = await authRepository.getPendingUsers();
    return successResponse(res, {
      message: "Daftar user pending berhasil diambil.",
      data: { total: users.length, users },
    });
  } catch (error) {
    logger.error("Get pending users error:", error);
    return errorResponse(res, { message: "Gagal mengambil data.", statusCode: 500 });
  }
};

//PATCH /api/auth/users/:id/approve ||Setujui registrasi user
const approveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const approver = req.user;

    const user = await authRepository.findById(id);
    if (!user) {
      return errorResponse(res, { message: "User tidak ditemukan.", statusCode: 404 });
    }

    if (user.isApproved) {
      return errorResponse(res, { message: "User sudah disetujui sebelumnya.", statusCode: 400 });
    }

    // Supervisor hanya bisa approve karyawan
    if (approver.status === "supervisor" && user.status !== "karyawan") {
      return errorResponse(res, {
        message: "Supervisor hanya bisa menyetujui karyawan.",
        statusCode: 403,
      });
    }

    await authRepository.approveUser(id, approver.id);

    await authRepository.createAuditLog({
      userId: approver.id,
      action: "REGISTER_APPROVED",
      detail: `Menyetujui user: ${user.username} (${user.status})`,
      ipAddress: getClientIp(req),
      userAgent: getUserAgent(req),
      username: approver.username,
    });

    logger.info(`${approver.username} menyetujui user: ${user.username}`);

    return successResponse(res, {
      message: `User ${user.nama} berhasil disetujui. Mereka kini bisa login.`,
    });
  } catch (error) {
    logger.error("Approve user error:", error);
    return errorResponse(res, { message: "Gagal menyetujui user.", statusCode: 500 });
  }
};

// PATCH /api/auth/users/:id/reject || Tolak / nonaktifkan user
const rejectUser = async (req, res) => {
  try {
    const { id } = req.params;
    const rejector = req.user;

    const user = await authRepository.findById(id);
    if (!user) {
      return errorResponse(res, { message: "User tidak ditemukan.", statusCode: 404 });
    }

    if (user.id === rejector.id) {
      return errorResponse(res, { message: "Tidak bisa menonaktifkan akun sendiri.", statusCode: 400 });
    }

    await authRepository.rejectUser(id);

    await authRepository.createAuditLog({
      userId: rejector.id,
      action: "REGISTER_REJECTED",
      detail: `Menonaktifkan user: ${user.username}`,
      ipAddress: getClientIp(req),
      userAgent: getUserAgent(req),
      username: rejector.username,
    });

    return successResponse(res, {
      message: `User ${user.nama} berhasil dinonaktifkan.`,
    });
  } catch (error) {
    logger.error("Reject user error:", error);
    return errorResponse(res, { message: "Gagal menonaktifkan user.", statusCode: 500 });
  }
};

//GET /api/auth/users || Daftar semua user (dengan filter & pagination)
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const result = await authRepository.getAllUsers({
      page: parseInt(page),
      limit: parseInt(limit),
      status,
      search,
    });

    return successResponse(res, {
      message: "Daftar user berhasil diambil.",
      data: result,
    });
  } catch (error) {
    logger.error("Get all users error:", error);
    return errorResponse(res, { message: "Gagal mengambil data.", statusCode: 500 });
  }
};

//GET /api/auth/activity || Riwayat aktivitas login user sendiri
const getMyActivity = async (req, res) => {
  try {
    const logs = await authRepository.getAuditLogs(req.user.id, 30);
    return successResponse(res, {
      message: "Riwayat aktivitas berhasil diambil.",
      data: logs,
    });
  } catch (error) {
    logger.error("Get activity error:", error);
    return errorResponse(res, { message: "Gagal mengambil riwayat.", statusCode: 500 });
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  getProfile,
  changePassword,
  getPendingUsers,
  approveUser,
  rejectUser,
  getAllUsers,
  getMyActivity,
};