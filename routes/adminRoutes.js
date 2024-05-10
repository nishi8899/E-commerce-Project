const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} = require("../controllers/adminController");
const { adminAuthMiddleware } = require("../middleware/adminAuth");
const router = express.Router();

router.post("/admin/register", registerAdmin);
router.post("/admin/login", adminAuthMiddleware, loginAdmin);
router.put("/admin/logout", adminAuthMiddleware, logoutAdmin);

module.exports = router;
