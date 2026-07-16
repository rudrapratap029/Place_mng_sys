const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  registerValidationRules,
  loginValidationRules,
  forgotPasswordValidationRules,
  resetPasswordValidationRules,
  refreshTokenValidationRules,
} = require("../validators/authValidator");

const validate = require("../middleware/validationMiddleware");

const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
} = require("../controllers/authController");

// Register
router.post(
  "/register",
  registerValidationRules,
  validate,
  registerAdmin
);

// Login
router.post(
  "/login",
  loginValidationRules,
  validate,
  loginAdmin
);

// Logout
router.post(
  "/logout",
  protect,
  logoutAdmin
);

// Forgot Password
router.post(
  "/forgotpassword",
  forgotPasswordValidationRules,
  validate,
  forgotPassword
);

// Reset Password
router.put(
  "/resetpassword/:token",
  resetPasswordValidationRules,
  validate,
  resetPassword
);

// Refresh Access Token
router.post(
  "/refresh-token",
  refreshTokenValidationRules,
  validate,
  refreshAccessToken
);

module.exports = router;