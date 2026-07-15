const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {registerAdmin , loginAdmin ,logoutAdmin , forgotPassword , resetPassword, refreshAccessToken } = require("../controllers/authController");

router.post("/register" , registerAdmin);
router.post("/login" , loginAdmin);
router.post("/logout",protect,logoutAdmin)
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);
router.post("/refresh-token", refreshAccessToken);
module.exports= router;