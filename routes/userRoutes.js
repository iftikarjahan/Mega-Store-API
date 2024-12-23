const router=require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");
const {authMiddleware,authorizationMiddleware}=require("../middleware/authentication");


router.route("/").get(authMiddleware,authorizationMiddleware("owner"),getAllUsers);  //this is only for admin
router.route("/showCurrentUser").get(authMiddleware,showCurrentUser);
router.route("/updateUser").post(updateUser);
router.route("/updateUserPassword").post(updateUserPassword);
router.route("/:id").get(authMiddleware,getSingleUser);

module.exports=router;



