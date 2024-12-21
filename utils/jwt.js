require("dotenv").config();
const jwt = require("jsonwebtoken");

/*
->When you call this function, you need to pass an object with payload key as the argument
*/
const createJWT = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const verifyJWT = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToRespnse = ({ res, tokenPayload }) => {
  const token = createJWT({ payload: tokenPayload });
  const thirtyDays = 1000 * 60 * 60 * 24 * 30;
  res.cookie("token", token, {
    httpOnly: true,
    expiresIn: new Date(Date.now() + thirtyDays),
    secure:process.env.NODE_ENV==="production",
    signed:true
  });
};

module.exports = { createJWT, verifyJWT,attachCookiesToRespnse };
