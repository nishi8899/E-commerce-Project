const Razorpay = require("razorpay");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    // Get user data from authenticated user

    const userId = req.user.id;

    const user = await User.findById(userId);

    // Create a new order document
    const newOrder = new Order({
      name: user.name,
      email: user.email,
      phone: req.body.customerInfo.phone,
      address: req.body.customerInfo.address,
      city: req.body.customerInfo.city,
      postalCode: req.body.customerInfo.zip,
      country: req.body.customerInfo.country,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      user: userId,
    });

    // Save the order to the database
    newOrder.status = "confirmed";
    await newOrder.save();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const razorpayOrder = await razorpay.orders.create({
      amount: req.body.totalAmount * 100,
      currency: "INR",
      receipt: newOrder._id.toString(),
    });

    // Send the Razorpay order ID to the client for payment processing
    res.status(200).json({ razorpayOrder, order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
};