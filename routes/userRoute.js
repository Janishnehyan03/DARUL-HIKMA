const router = require("express").Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/", userController.getAllUsers);
router.post(
  "/activate/:id",
  authController.protect,
  userController.activateUser
);
router.post(
  "/deactivate/:id",
  authController.protect,
  userController.deactivateUser
);

module.exports = router;
