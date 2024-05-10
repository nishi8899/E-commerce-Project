const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");
const { userAuthMiddleware } = require("../middleware/userAuth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userAuthMiddleware, loginUser);
router.put("/logout", userAuthMiddleware, logoutUser);

module.exports = router;
