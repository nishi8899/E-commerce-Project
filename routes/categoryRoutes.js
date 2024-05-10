const express = require("express");
const {
  getAllCategory,
  createNewCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
} = require("../controllers/categoryController");
const router = express.Router();
const { adminAuthMiddleware } = require("../middleware/adminAuth");
const { userAuthMiddleware } = require("../middleware/userAuth");

router.get("/category", getAllCategory);
router.post("/admin/category/new", createNewCategory);

router.put("/admin/category/:id", updateCategory);
router.delete("/admin/category/:id", deleteCategory);
if (adminAuthMiddleware || userAuthMiddleware) {
  router.get("/admin/category/:id", getSingleCategory);
}
// router.get("/admin/category/:id", adminAuthMiddleware, getSingleCategory);
module.exports = router;
