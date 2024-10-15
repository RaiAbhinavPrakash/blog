require("dotenv").config();

const JWT = require("jsonwebtoken");

const secret = process.env.SECRET;

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    name: user.fullName,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = { createTokenForUser, validateToken };
