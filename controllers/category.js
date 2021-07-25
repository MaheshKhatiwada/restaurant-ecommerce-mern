const  Category=require('../models/Category')
exports.create = async (req, res) => {
  const { category } = req.body;

  try {
    const newCategory = new Category({
      category,
    });
    await newCategory.save();
    res.json({
      successMsg: `${newCategory.category} added`,
    });
  } catch (error) {
    res.status(500).json({
      errorMsg: "Server Error",
    });
  }
};
