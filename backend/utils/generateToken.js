const jwt = require("jsonwebtoken");

const generateToken = (adminId) => {
  return jwt.sign(
    {
      id: adminId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};  
// helo

module.exports = generateToken;