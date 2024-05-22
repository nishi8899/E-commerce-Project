//authorization middleware
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
require("dotenv").config(); 

exports.adminAuthMiddleware = async (req, res, next) => {
  //Get token from the header
  //header key
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "No admin token,authorization fail!" });
  }

  //verify token
  try {
    //decode the token
     const decoded = jwt.verify(token,  process.env.ADMIN_SECRET);

    //setting req.user in the  decoded token  and decoded has user (remember in payload)
    req.admin = await Admin.findById(decoded.admin.id);

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
