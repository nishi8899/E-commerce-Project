const { Router } = require("express");
const express = require("express");
const {
  getAuth,
  createAuth,
  createAdminAuth,
  getAdminAuth,
} = require("../controllers/authController");
const { userAuthMiddleware } = require("../middleware/userAuth");
const { adminAuthMiddleware } = require("../middleware/adminAuth");
const router = express.Router();

router.get("/auth", userAuthMiddleware, getAuth);
router.get("/admin/auth", adminAuthMiddleware, getAdminAuth);
router.post("/auth", createAuth);
router.post("/admin/auth", createAdminAuth);
module.exports = router;
