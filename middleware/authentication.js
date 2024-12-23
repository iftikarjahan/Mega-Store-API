/*
    THE WORK OF AUTH MIDDLEWARE IS TO CHECK WHETHER THE USER IS LOGGED IN OR NOT
*/ 

const myErrors = require("../errors");
const verifyToken = require("../utils").verifyJWT;
const { UnauthorizedError } = require("../errors");

const authMiddleware = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new myErrors.UnauthenticatedError(
      "Authentication Failed....Please login and try again"
    );
  }

  try {
    // you need to extract the info out of the token by veriefying it and attach it to the req so that we can use the info later on
    const { name, role, userId } = verifyToken({ token });
    req.user = { name, role, userId };
    next();
  } catch (error) {
    throw new myErrors.UnauthenticatedError(
      "Authentication Failed....Please login and try again"
    );
  }
};

const authorizationMiddleware = (...rest) => {
  // console.log(req);

  // if(req.user.role!=="admin"){
  //     throw new UnauthorizedError("User not allowed to get all users🤬");
  // }
  // next();
  return (req, res, next) => {
    if (!rest.includes(req.user.role)) {
      throw new UnauthorizedError("User not allowed to get all users🤬");
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  authorizationMiddleware,
};
