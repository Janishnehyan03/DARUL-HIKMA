const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post('/logout', userController.logout);

module.exports = router;
