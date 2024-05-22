//authorization middleware
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

exports.userAuthMiddleware = async (req, res, next) => {
  //Get token from the header
  //header key
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token,authorization fail!" });
  }

  //verify token
  try {
    //decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //setting req.user in the  decoded token  and decoded has user (remember in payload)
    req.user = await User.findById(decoded.user.id);

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
