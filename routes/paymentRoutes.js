const express = require("express");
const router = express.Router();
const { paymentVerification } = require("../controllers/paymentController");

router.post("/payment", paymentVerification);

module.exports = router;
