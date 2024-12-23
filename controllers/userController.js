const User = require("../models/User");
const StatusCodes = require("http-status-codes");
const {NotFoundError}=require('../errors')

const getAllUsers =async (req, res, next) => {
    // console.log(req.user);
  const users =await User.find({ role: "user" }, "-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser =async (req, res, next) => {
  const user=await User.findOne({_id:req.params.id},"-password");
  if(!user){
    throw new NotFoundError("User Does Not Exist🤔");
  }
  res.status(StatusCodes.OK).json({user});
};

const showCurrentUser = (req, res, next) => {
    /*
    ->Once you have checked the user is logged in, you need to just pass the user info
    ->This data about the current user could be used in the frontend
    */ 
   res.status(StatusCodes.OK).json({user:req.user});
};

const updateUser = (req, res, next) => {
  res.send("Update User");
};

const updateUserPassword = (req, res, next) => {
  res.send("Update User Password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
