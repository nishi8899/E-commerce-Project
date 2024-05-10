const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },

  images: {
    type: String,
  },

  gender: {
    type: String,
    //required: [t "Please select gender for this product"],
    enum: {
      values: ["Mens", "Womens", "Kids"],
      message: "Please select correct gender for product",
    },
  },

  //fetch category from categories table
  category: {
    // type: String,
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    //required: true,refrence: category

    //PromductModel.find({_id:asdasd}).populate(CateogryModel)
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
