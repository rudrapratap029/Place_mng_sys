const jwt = require("jsonwebtoken");

const generateRefreshToken = (adminId) =>{

  return jwt.sign(
    {
    id : adminId,
  },
  process.env.JWT_REFRESH_SECRET,
  {
    expiresIn : process.env.JWT_REFRESH_EXPIRES_IN,
  }
);
};

module.exports = generateRefreshToken;