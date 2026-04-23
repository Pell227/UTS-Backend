// src/api/components/auth/auth-Controller.js
const authRepository  = require("../../../repositories/auth.repository");
const { generateTokenPair, verifyRefreshToken } = require("../../../utils/jwt");
const { successResponse, errorResponse }        = require("../../../utils/response");
const logger = require("../../../utils/logger");

const getClientIp  = (req) =>
  req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket?.remoteAddress || "unknown";
const getUserAgent = (req) => req.headers["user-agent"] || "unknown";

// ─── REGISTER ─────────────────────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { nama, username, email, password, status, nip, noHp } = req.body;
    const ip = getClientIp(req);

    if (await authRepository.isUsernameTaken(username))
      return errorResponse(res, { message: "Username sudah digunakan.", statusCode: 409 });

    if (await authRepository.isEmailTaken(email))
      return errorResponse(res, { message: "Email sudah terdaftar.", statusCode: 409 });

    if (nip && (await authRepository.isNipTaken(nip)))
      return errorResponse(res, { message: "NIP sudah terdaftar.", statusCode: 409 });

    const isFirstUser = (await authRepository.countUsers()) === 0;

    const newUser = await authRepository.createUser({
      nama,
      username,
      email,
      password,
      status:     isFirstUser ? "admin" : status,
      nip:        nip  || null,
      noHp:       noHp || null,
      isApproved: isFirstUser,
      isActive:   true,
    });

    await authRepository.createAuditLog({
      userId:    newUser.id,
      action:    "REGISTER",
      detail:    isFirstUser ? "User pertama — otomatis admin & disetujui" : "Menunggu persetujuan",
      ipAddress: ip,
      userAgent: getUserAgent(req),
      username:  newUser.username,
    });

    logger.info(`Registrasi: ${newUser.username} (${newUser.status}) dari ${ip}`);

    return successResponse(res, {
      message: isFirstUser
        ? "Registrasi berhasil! Akun admin langsung aktif."
        : "Registrasi berhasil! Tunggu persetujuan supervisor/admin.",
      data: {
        id:         newUser.id,
        nama:       newUser.nama,
        username:   newUser.username,
        email:      newUser.email,
        status:     newUser.status,
        isApproved: newUser.isApproved,
      },
      statusCode: 201,
    });
  } catch (error) {
    logger.error("Register error:", error);
    if (error.name === "SequelizeValidationError")
      return errorResponse(res, { message: error.errors[0].message, statusCode: 422 });
    if (error.name === "SequelizeUniqueConstraintError")
      return errorResponse(res, { message: "Data sudah terdaftar.", statusCode: 409 });
    return errorResponse(res, { message: "Gagal mendaftarkan akun.", statusCode: 500 });
  }
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const ip = getClientIp(req);
    const ua = getUserAgent(req);

    const user = await authRepository.findByUsernameOrEmail(identifier);

    if (!user) {
      await authRepository.createAuditLog({
        action: "LOGIN_FAILED", detail: `User tidak ditemukan: ${identifier}`,
        ipAddress: ip, userAgent: ua, username: identifier,
      });
      return errorResponse(res, { message: "Username/email atau password salah.", statusCode: 401 });
    }

    if (user.isLocked()) {
      const remaining = Math.ceil((user.lockedUntil - new Date()) / 60000);
      await authRepository.createAuditLog({
        userId: user.id, action: "LOGIN_FAILED",
        detail: `Akun terkunci. Sisa ${remaining} menit`,
        ipAddress: ip, userAgent: ua, username: user.username,
      });
      return errorResponse(res, {
        message: `Akun terkunci. Coba lagi dalam ${remaining} menit.`,
        statusCode: 423,
      });
    }

    if (!user.isActive)
      return errorResponse(res, { message: "Akun dinonaktifkan. Hubungi supervisor.", statusCode: 403 });

    if (!user.isApproved)
      return errorResponse(res, { message: "Akun belum disetujui supervisor/admin.", statusCode: 403 });

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      await user.incrementLoginAttempts();
      const remaining = Math.max(0, 5 - user.loginAttempts);
      await authRepository.createAuditLog({
        userId: user.id, action: "LOGIN_FAILED",
        detail: `Password salah. Sisa percobaan: ${remaining}`,
        ipAddress: ip, userAgent: ua, username: user.username,
      });
      if (user.isLocked())
        return errorResponse(res, { message: "Akun dikunci 15 menit karena terlalu banyak percobaan.", statusCode: 423 });
      return errorResponse(res, {
        message: `Username/email atau password salah. Sisa percobaan: ${remaining}`,
        statusCode: 401,
      });
    }

    const { accessToken, refreshToken } = generateTokenPair(user);
    await authRepository.updateRefreshToken(user.id, refreshToken);
    await authRepository.updateLastLogin(user.id, ip);

    await authRepository.createAuditLog({
      userId: user.id, action: "LOGIN_SUCCESS",
      detail: `Login berhasil dari ${ip}`,
      ipAddress: ip, userAgent: ua, username: user.username,
    });

    logger.info(`Login: ${user.username} (${user.status}) dari ${ip}`);

    return successResponse(res, {
      message: "Login berhasil!",
      data: {
        accessToken,
        refreshToken,
        user: {
          id:       user.id,
          nama:     user.nama,
          username: user.username,
          email:    user.email,
          status:   user.status,
          nip:      user.nip,
        },
        expiresIn: process.env.JWT_EXPIRES_IN || "8h",
      },
    });
  } catch (error) {
    logger.error("Login error:", error);
    return errorResponse(res, { message: "Gagal login.", statusCode: 500 });
  }
};

// ─── LOGOUT ───────────────────────────────────────────────────────────────────
const logout = async (req, res) => {
  try {
    const { user } = req;
    await authRepository.clearRefreshToken(user.id);
    await authRepository.createAuditLog({
      userId: user.id, action: "LOGOUT", detail: "Logout berhasil",
      ipAddress: getClientIp(req), userAgent: getUserAgent(req), username: user.username,
    });
    logger.info(`Logout: ${user.username}`);
    return successResponse(res, { message: "Logout berhasil." });
  } catch (error) {
    logger.error("Logout error:", error);
    return errorResponse(res, { message: "Gagal logout.", statusCode: 500 });
  }
};

// ─── REFRESH TOKEN ────────────────────────────────────────────────────────────
const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    let decoded;
    try { decoded = verifyRefreshToken(token); }
    catch { return errorResponse(res, { message: "Refresh token tidak valid.", statusCode: 401 }); }

    const user = await authRepository.findByRefreshToken(token);
    if (!user || user.id !== decoded.id)
      return errorResponse(res, { message: "Refresh token tidak valid.", statusCode: 401 });

    if (!user.isActive || !user.isApproved)
      return errorResponse(res, { message: "Akun tidak aktif atau belum disetujui.", statusCode: 403 });

    const { accessToken, refreshToken: newRefreshToken } = generateTokenPair(user);
    await authRepository.updateRefreshToken(user.id, newRefreshToken);

    await authRepository.createAuditLog({
      userId: user.id, action: "TOKEN_REFRESHED", detail: "Token diperbarui",
      ipAddress: getClientIp(req), userAgent: getUserAgent(req), username: user.username,
    });

    return successResponse(res, {
      message: "Token berhasil diperbarui.",
      data: { accessToken, refreshToken: newRefreshToken, expiresIn: process.env.JWT_EXPIRES_IN || "8h" },
    });
  } catch (error) {
    logger.error("Refresh token error:", error);
    return errorResponse(res, { message: "Gagal memperbarui token.", statusCode: 500 });
  }
};

// ─── CHANGE PASSWORD ──────────────────────────────────────────────────────────
const changePassword = async (req, res) => {
  try {
    const { passwordLama, passwordBaru } = req.body;
    const { user } = req;

    const isValid = await user.comparePassword(passwordLama);
    if (!isValid)
      return errorResponse(res, { message: "Password lama tidak sesuai.", statusCode: 400 });

    user.password = passwordBaru;
    await user.save();
    await authRepository.clearRefreshToken(user.id);

    await authRepository.createAuditLog({
      userId: user.id, action: "PASSWORD_CHANGED", detail: "Password diubah, semua sesi dihapus",
      ipAddress: getClientIp(req), userAgent: getUserAgent(req), username: user.username,
    });

    return successResponse(res, { message: "Password berhasil diubah. Silakan login ulang." });
  } catch (error) {
    logger.error("Change password error:", error);
    return errorResponse(res, { message: "Gagal mengubah password.", statusCode: 500 });
  }
};

module.exports = { register, login, logout, refreshToken, changePassword };