const express = require("express");
const router = express.Router();
const { createOrder,getAllOrders } = require("../controllers/orderController");
const { userAuthMiddleware } = require("../middleware/userAuth");

router.post("/order", userAuthMiddleware, createOrder);
router.get("/getorders", getAllOrders);

module.exports = router;
