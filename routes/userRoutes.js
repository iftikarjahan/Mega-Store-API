const router=require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");
const {authMiddleware}=require("../middleware/authentication");


router.route("/").get(authMiddleware,getAllUsers);
router.route("/showCurrentUser").get(showCurrentUser);
router.route("/updateUser").post(updateUser);
router.route("/updateUserPassword").post(updateUserPassword);
router.route("/:id").get(authMiddleware,getSingleUser);

module.exports=router;

