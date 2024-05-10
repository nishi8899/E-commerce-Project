const Admin = require("../models/adminModel");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/userAuth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//Register Admin
exports.registerAdmin = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Admin already exists" }] });
      }

      admin = new Admin({
        name,
        email,
        password,
        avatar: {
          public_id: "avatar",
          url: "avatar",
        },
      });

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();
      const payload = {
        admin: {
          id: admin.id,
        },
      };
      jwt.sign(
        payload,
        config.get("adminToken"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  },
];

//Login Admin
exports.loginAdmin = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //see if admin exists
      let admin = await Admin.findOne({
        email,
      });
      if (!admin) {
        //matching the error msg from the check above errors message
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        admin: {
          id: admin.id,
        },
      };
      jwt.sign(
        payload,
        config.get("adminToken"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log("err", err.message);
      res.status(500).send("Server error");
    }
  },
];

//Logout Admin
exports.logoutAdmin = async (req, res) => {
  //token is not required to logout
  const authHeader = req.header("x-auth-token");

  //replace the token with an empty string
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.status(200).json({
        success: true,
        message: "Admin is logged out",
      });
    } else {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  });
};
