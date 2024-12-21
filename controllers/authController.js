const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { attachCookiesToRespnse } = require("../utils");
const { UnauthenticatedError } = require("../errors");
/*
->Authenticating a user consists of 3 steps-register, login logout
*/

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  // we want to set the first registerd user as admin
  const isFirstDocument = (await User.countDocuments({})) === 0;
  role = isFirstDocument ? "admin" : "user";
  const createdUser = await User.create({ name, email, password, role });
  /*
    ->Generally, we should not send the entire created user as a response to the client
     because it contains sensitive user info
    ->So we should send less data along with the jwt token
    */
  const tokenPayload = {
    name: createdUser.name,
    role: createdUser.role,
    userId: createdUser._id,
  };
  attachCookiesToRespnse({ res, tokenPayload });
  res.status(StatusCodes.CREATED).json({ user: tokenPayload });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new UnauthenticatedError("Please provide both email and password");
  }
  //   check if the correct email has been provided or not
  const user = await User.findOne({ email });
  
  if (!user) {
    throw new UnauthenticatedError(
      "The user does not exist....Please enter valid credentials"
    );
  }
  // now check if the password is correct or not
  const passwordIsValid =await user.comparePassword(password);
  if (!passwordIsValid) {
    throw new UnauthenticatedError(
      "Password Invalid....Please enter a valid password"
    );
  }
  // if the password is valid, create a jwt token and send the response to the client
  const tokenPayload = {
    name: user.name,
    role: user.role,
    userId: user._id,
  };
//   now send this as a token inside a cookie
attachCookiesToRespnse({res,tokenPayload});
res.status(StatusCodes.OK).json({user:tokenPayload})
};


const logout = (req, res, next) => {
  console.log(req.signedCookies);

  res.send("Logout User");
};

module.exports = {
  register,
  login,
  logout,
};
