const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const {createJWT}=require("../utils");
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
  const token = createJWT({payload:tokenPayload});
/*
->Instead of sending the jwt token with the response, we send it using a cookie
*/   
const thirtyDays=1000*60*60*24*30;
  res.cookie("token",token,{
    httpOnly:true,
    expiresIn:new Date(Date.now()+thirtyDays)
  })
  res.status(StatusCodes.CREATED).json({ user: tokenPayload});
};
const login = (req, res, next) => {
  res.send("Login User");
};
const logout = (req, res, next) => {
    // console.log(req.cookies);
    
  res.send("Logout User");
};

module.exports = {
  register,
  login,
  logout,
};
