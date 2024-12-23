const User = require("../models/User");
const StatusCodes = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");

const getAllUsers = async (req, res, next) => {
  // console.log(req.user);
  const users = await User.find({ role: "user" }, "-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id }, "-password");
  if (!user) {
    throw new NotFoundError("User Does Not Exist🤔");
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = (req, res, next) => {
  /*
    ->Once you have checked the user is logged in, you need to just pass the user info
    ->This data about the current user could be used in the frontend
    */
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = (req, res, next) => {
  res.send("Update User");
};

const updateUserPassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide both the fields😅");
  }
  //   now I have to check if the old password provided is correct or not
  const { name, role, userId } = req.user;
  const user = await User.findById(userId);
  const passowsIsCorrect = await user.comparePassword(oldPassword);
  if (!passowsIsCorrect) {
    throw new UnauthenticatedError(
      "Invalid Credentials....Please enter the correct password"
    );
  }
  //   If the password is correct, then replace the old password with the new password
  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({msg:"Success!!....Password updated Successfully"});
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
