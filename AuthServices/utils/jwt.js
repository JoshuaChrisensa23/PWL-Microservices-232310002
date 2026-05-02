const jwt = require("jsonwebtoken");
/** * Generate JWT access token */ const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      email: user.email,
      name: user.name,
      type: "access",
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "7d" },
  );
};
/** * Generate JWT refresh token */ const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, type: "refresh" },
    process.env.JWT_SECRET,
    { expiresIn: "30d" },
  );
};
/** * Verify JWT token */ const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
module.exports = { generateToken, generateRefreshToken, verifyToken };
