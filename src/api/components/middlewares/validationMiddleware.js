const { body, validationResult } = require("express-validator");
const { errorResponse } = require("../utils/response");
 
// Validator Runner
 

 //Jalankan validasi dan kembalikan error jika ada
 
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    return errorResponse(res, {
      message: "Data tidak valid",
      errors: formattedErrors,
      statusCode: 422,
    });
  }
  next();
};
 
//Validation Rules 
 
const loginValidation = [
  body("identifier")
    .notEmpty().withMessage("Username atau email wajib diisi")
    .isLength({ max: 150 }).withMessage("Input terlalu panjang"),
 
  body("password")
    .notEmpty().withMessage("Password wajib diisi")
    .isLength({ max: 128 }).withMessage("Password terlalu panjang"),
 
  validate,
];
 
const registerValidation = [
  body("nama")
    .notEmpty().withMessage("Nama wajib diisi")
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage("Nama harus antara 2-100 karakter"),
 
  body("username")
    .notEmpty().withMessage("Username wajib diisi")
    .trim()
    .isLength({ min: 3, max: 50 }).withMessage("Username harus antara 3-50 karakter")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username hanya boleh huruf, angka, dan underscore"),
 
  body("email")
    .notEmpty().withMessage("Email wajib diisi")
    .isEmail().withMessage("Format email tidak valid")
    .normalizeEmail()
    .isLength({ max: 150 }).withMessage("Email terlalu panjang"),
 
  body("password")
    .notEmpty().withMessage("Password wajib diisi")
    .isLength({ min: 8 }).withMessage("Password minimal 8 karakter")
    .isLength({ max: 128 }).withMessage("Password maksimal 128 karakter")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password harus mengandung huruf besar, huruf kecil, dan angka"),
 
  body("konfirmasiPassword")
    .notEmpty().withMessage("Konfirmasi password wajib diisi")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Konfirmasi password tidak cocok");
      }
      return true;
    }),
 
  body("status")
    .notEmpty().withMessage("Status wajib diisi")
    .isIn(["karyawan", "supervisor"]).withMessage("Status harus: karyawan atau supervisor"),
 
  body("nip")
    .optional({ checkFalsy: true })
    .isLength({ max: 20 }).withMessage("NIP maksimal 20 karakter"),
 
  body("noHp")
    .optional({ checkFalsy: true })
    .matches(/^[0-9+\-\s]*$/).withMessage("Format nomor HP tidak valid")
    .isLength({ max: 15 }).withMessage("Nomor HP maksimal 15 karakter"),
 
  validate,
];
 
const refreshTokenValidation = [
  body("refreshToken")
    .notEmpty().withMessage("Refresh token wajib diisi"),
  validate,
];
 
const changePasswordValidation = [
  body("passwordLama")
    .notEmpty().withMessage("Password lama wajib diisi"),
 
  body("passwordBaru")
    .notEmpty().withMessage("Password baru wajib diisi")
    .isLength({ min: 8 }).withMessage("Password baru minimal 8 karakter")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password harus mengandung huruf besar, huruf kecil, dan angka")
    .custom((value, { req }) => {
      if (value === req.body.passwordLama) {
        throw new Error("Password baru tidak boleh sama dengan password lama");
      }
      return true;
    }),
 
  body("konfirmasiPasswordBaru")
    .custom((value, { req }) => {
      if (value !== req.body.passwordBaru) {
        throw new Error("Konfirmasi password tidak cocok");
      }
      return true;
    }),
 
  validate,
];
 
module.exports = {
  loginValidation,
  registerValidation,
  refreshTokenValidation,
  changePasswordValidation,
  validate,
};