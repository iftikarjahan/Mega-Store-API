const User=require("../models/User");
const {StatusCodes}=require("http-status-codes");
/*
->Authenticating a user consists of 3 steps-register, login logout
*/

const register =async (req, res, next) => {
    const{name,email,password}=req.body;
    // we want to set the first registerd user as admin
    const isFirstDocument=await User.countDocuments({})===0;
    role=isFirstDocument ? "admin" : "user";
    const createdUser=await User.create({name,email,password,role});
    res.status(StatusCodes.CREATED).json({createdUser});
};
const login = (req, res, next) => {
  res.send("Login User");
};
const logout = (req, res, next) => {
  res.send("Logout User");
};

module.exports = {
  register,
  login,
  logout,
};
