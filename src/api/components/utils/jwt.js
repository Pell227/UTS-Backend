const jwt = require("jsonwebtoken");
 
const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "8h",
    issuer: "kasir-app",
    audience: "kasir-client",
  });
};
 
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    issuer: "kasir-app",
    audience: "kasir-client",
  });
};
 
const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, {
    issuer: "kasir-app",
    audience: "kasir-client",
  });
};
 
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
    issuer: "kasir-app",
    audience: "kasir-client",
  });
};
 
const generateTokenPair = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    status: user.status,
    nama: user.nama,
  };
 
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken({ id: user.id });
 
  return { accessToken, refreshToken };
};
 
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateTokenPair,
};