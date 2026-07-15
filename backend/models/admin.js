const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },

    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

// Hash Password Before Saving
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generate Reset Password Token
adminSchema.methods.getResetPasswordToken = function () {
  // Generate Random Token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Store Hashed Token in Database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Token Expiry (15 Minutes)
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  // Return Original Token
  return resetToken;
};

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

module.exports = Admin;