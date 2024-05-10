const Product = require("../models/productModel.js");
const Category = require("../models/categoryModel.js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path-browserify");

const WebSocket = require("ws");
const wss = new WebSocket.Server({noServer: true});

exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

exports.fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// @desc    Create new product

exports.createNewProduct = async (req, res) => {
  try {
    //check product exists or not

    let product = await Product.findOne({ name: req.body.name });

    if (product) {
      return res.status(400).json("product already exists");
    }

    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const images = req.file && req.file.filename ? req.file.filename : "";
    //populate the categories from the category model which is in product model
    const category = req.body.category;

    const newProductData = {
      name,
      price,
      description,
      images,
      category,
    };
    const newProduct = new Product(newProductData);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    // console.log("error", err);
    res.status(500).send("Server Error");
  }
};

exports.getAllProducts = async (req, res) => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  const sort = req.query.sort || "name";
  const keywords = req.query.keyword;

  try {
    let query = {};

    if (keywords) {
      query = { name: { $regex: keywords, $options: "i" } };
    }

    const products = await Product.find(query)
      .sort({ [sort]: 1 })
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage))
      .populate("category");

    const totalItemsCount = await Product.countDocuments(query);

    const response = {
      products,
      currentPage: parseInt(page),
      perPage: parseInt(perPage),
      totalItemsCount,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get single Product
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json("Product not found");
    res.json(product);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
exports.getCategoryByProduct = async (req, res) => {
  try {
    //find the category of the product
    const product = await Product.find({
      category: req.params.id,
    }).populate("category");
    if (!product) return res.status(404).json("Product not found");
    res.json(product);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//Update Product--Admin oy
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json("Product not found");
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    // Send WebSocket update to clients
    const updateMessage = JSON.stringify({ type: 'product_update', data: updatedProduct });
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(updateMessage);
      }
    });
    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

//Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      if (!product) return res.status(404).json("Product not found");
    await product.delete();
    res.status(200).json("Product deleted successfully");
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
