const Category = require("../models/categoryModel.js");

// @desc    Create new category

exports.createNewCategory = async (req, res) => {
  try {
    //check category exists or not

    let category = await Category.findOne({ name: req.body.name });

    if (category) {
      return res.status(400).json("category already exists");
    }

    category = new Category(req.body);

    await category.save();
    res.json(category);
  } catch (err) {
    console.log("error", err);
    res.status(500).send("Server Error");
  }
};

//Get all Category
exports.getAllCategory = async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
};

//get single Category
exports.getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json("Category not found");
    res.json(category);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//Update Category--Admin only
exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json("Category not found");
    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.json({ message: "Category updated successfully", category: category });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category)
      if (!category) return res.status(404).json("Category not found");
    await category.delete();
    res.status(200).json("Category deleted successfully");
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
