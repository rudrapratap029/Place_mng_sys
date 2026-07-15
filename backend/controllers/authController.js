const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");

// Register Admin
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role,
    });

    // Remove password from response
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: adminResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
            //  validation 
    if (!email || !password) {
    return res.status(400).json({
        success: false,
        message: "Email and password are required",
    });
}

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(admin._id);

    // Remove password from response
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: adminResponse,
    });
  }
  
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const logoutAdmin = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
const forgotPassword = async (req, res) => {
  try {
    // Get Email
    const { email } = req.body;

    // Check Admin
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Generate Reset Token
    const resetToken = admin.getResetPasswordToken();

    // Save Token & Expiry
    await admin.save({ validateBeforeSave: false });

    // Create Reset URL
    const resetUrl = `http://localhost:3000/api/auth/resetpassword/${resetToken}`;

    // Response (Email integration baad me karenge)
    return res.status(200).json({
      success: true,
      message: "Password reset link generated successfully",
      resetUrl,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


const resetPassword = async (req, res) => {
  try {
    // Hash Token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // Find Admin by Token & Check Expiry
    const admin = await Admin.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Set New Password
    admin.password = req.body.password;

    // Clear Reset Fields
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    // Save Admin (Password will be hashed by pre-save hook)
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};



module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  forgotPassword,
  resetPassword,
};