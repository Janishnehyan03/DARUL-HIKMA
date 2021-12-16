const router = require("express").Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const passport = require("passport");

router.post(
  "/create",
  authController.protect,
  authController.restrictTo("admin"),
  authController.createUser
);
router.post("/login", authController.login);
router.get(
  "/passport-auth",
  passport.authenticate("google", { scope: ["profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  })
);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

//  This middleware will run for the below routes
router.use(authController.protect); // protect all below routes, doesn't work for the above functions

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete("/delete", userController.deleteMe);

// -------------------- //

router.use(authController.restrictTo("admin")); // restricted the below routes, only for admins

router
  .route("/:id")
  .get(userController.getUser)
  .post(userController.createUser)
  .patch(userController.updateUser)
  .delete(authController.restrictTo("admin"), userController.deleteUser);
router.route("/").get(userController.getAllUsers);

module.exports = router;
