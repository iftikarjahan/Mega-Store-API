const router=require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");


router.route("/").get(getAllUsers);
router.route("/showCurrentUser").get(showCurrentUser);
router.route("/updateUser").post(updateUser);
router.route("/updateUserPassword").post(updateUserPassword);
router.route("/:id").get(getSingleUser);

module.exports=router;

