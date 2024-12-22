const getAllUsers = (req, res, next) => {
  res.send("Get All Users");
};

const getSingleUser = (req, res, next) => {
    console.log(req.params);
  res.send("Get single user");
};

const showCurrentUser = (req, res, next) => {
  res.send("Show Current User");
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
    updateUserPassword
};
