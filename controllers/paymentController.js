const express = require("express");
const crypto = require("crypto");
const Payment = require("../models/paymentModel");
const Order = require("../models/orderModel");

exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const { orderId } = req.query;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
      const order = await Order.findById(orderId);

      // Update order status to "paid"
      order.status = "paid";
      await order.save();
      // Save payment details to the database
      const payment = await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderId: orderId,
      });

      res.status(200).json({ success: true, payment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save payment details" });
    }
  } else {
    res.status(400).json({ success: false });
  }
};
