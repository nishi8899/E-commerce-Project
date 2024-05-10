const express = require("express");
const {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getCategoryByProduct,
} = require("../controllers/productController");
const router = express.Router();
const { adminAuthMiddleware } = require("../middleware/adminAuth");
const { userAuthMiddleware } = require("../middleware/userAuth");
const multer = require("multer");
const { storage, fileFilter } = require("../controllers/productController");

let upload = multer({ storage, fileFilter });


if (userAuthMiddleware || adminAuthMiddleware) {
  router.get("/products", getAllProducts);
}
router.post("/admin/products/new", upload.single("images"), createNewProduct);

router.put("/admin/products/:id", updateProduct);
router.delete("/admin/products/:id", deleteProduct);
router.get("/admin/products/:id", getSingleProduct);
router.get("/products/:id", getCategoryByProduct);
module.exports = router;
