require("dotenv").config();
const jwt = require("jsonwebtoken");

/*
->When you call this function, you need to pass an object with payload key as the argument
*/
const createJWT = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};

const verifyJWT = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { createJWT, verifyJWT };
