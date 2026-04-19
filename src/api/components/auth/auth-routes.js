const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { authenticate, requireSupervisorOrAdmin } = require("../auth/authMiddleware");
const {
  loginValidation,
  registerValidation,
  refreshTokenValidation,
  changePasswordValidation,
} = require("../middlewares/validationMiddleware");

// ─── Public Routes (tidak perlu token) ───────────────────────────────────────

/**
 * @route   POST /api/auth/register
 * @desc    Daftar akun baru (butuh approval sebelum bisa login)
 * @access  Public
 */
router.post("/register", registerValidation, authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login dengan username/email + password
 * @access  Public
 */
router.post("/login", loginValidation, authController.login);

/**
 * @route   POST /api/auth/refresh-token
 * @desc    Perbarui access token menggunakan refresh token
 * @access  Public (dengan refresh token)
 */
router.post("/refresh-token", refreshTokenValidation, authController.refreshToken);

// ─── Protected Routes (perlu token) ──────────────────────────────────────────

/**
 * @route   POST /api/auth/logout
 * @desc    Logout dan hapus refresh token
 * @access  Private
 */
router.post("/logout", authenticate, authController.logout);

/**
 * @route   GET /api/auth/profile
 * @desc    Ambil data profil user yang login
 * @access  Private
 */
router.get("/profile", authenticate, authController.getProfile);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Ubah password
 * @access  Private
 */
router.put("/change-password", authenticate, changePasswordValidation, authController.changePassword);

/**
 * @route   GET /api/auth/activity
 * @desc    Riwayat aktivitas login user sendiri
 * @access  Private
 */
router.get("/activity", authenticate, authController.getMyActivity);

// ─── Supervisor & Admin Routes ────────────────────────────────────────────────

/**
 * @route   GET /api/auth/users/pending
 * @desc    Daftar user menunggu persetujuan
 * @access  Supervisor, Admin
 */
router.get("/users/pending", authenticate, requireSupervisorOrAdmin, authController.getPendingUsers);

/**
 * @route   GET /api/auth/users
 * @desc    Daftar semua user (dengan filter & pagination)
 * @access  Supervisor, Admin
 */
router.get("/users", authenticate, requireSupervisorOrAdmin, authController.getAllUsers);

/**
 * @route   PATCH /api/auth/users/:id/approve
 * @desc    Setujui registrasi user
 * @access  Supervisor (hanya karyawan), Admin (semua)
 */
router.patch("/users/:id/approve", authenticate, requireSupervisorOrAdmin, authController.approveUser);

/**
 * @route   PATCH /api/auth/users/:id/reject
 * @desc    Tolak/nonaktifkan user
 * @access  Supervisor, Admin
 */
router.patch("/users/:id/reject", authenticate, requireSupervisorOrAdmin, authController.rejectUser);

module.exports = router;