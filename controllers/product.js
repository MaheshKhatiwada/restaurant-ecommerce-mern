const Product = require("../models/Product");
const fs=require('fs')
exports.create = async (req, res) => {
  const { filename } = req.file;
  const {
    productName,
    productDesc,
    productPrice,
    productCategory,
    productQty,
  } = req.body;

  try {
    const product = new Product();
    product.filename = filename;
    product.productName = productName;
    product.productDesc = productDesc;
    product.productPrice = productPrice;
    product.productCategory = productCategory;
    product.productQty = productQty;

    await product.save();
    res.status(200).json({
      successMsg: `${productName} was added`,
      product,
    });
  } catch (error) {
    res.status(500).json({
      errorMsg: "Please try again later",
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const products = await Product.find({}).populate(
      "productCategory",
      "category"
    );

    res.json({ products });
  } catch (error) {
    res.status(500).json({
      errorMsg: "Please try again later",
    });
  }
};

exports.read = async (req, res) => {
  try {
    const productId=req.params.productId;
    const product=await Product.findById(productId);
    res.json(product );
  } catch (error) {
    res.status(500).json({
      errorMsg: "Please try again later",
    });
  }
};
exports.update = async (req, res) => {
  try {
    const productId=req.params.productId;
    console.log(req.body);
    console.log(req.file)
    req.body.filename=req.file.filename;
    const oldProduct= await Product.findByIdAndUpdate(productId,req.body);
    fs.unlink(`uploads/${oldProduct.filename}`,err=>{
      if(err) throw err;
      console.log('Image successfully deleted from fs')
  })
  res.json({
    successMsg:"Product successfully updated"
  })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      errorMsg: "Please try again later",
    });
  }
};


exports.delete = async (req, res) => {
  try {
    const productId=req.params.productId;
    const deletedProduct= await Product.findByIdAndDelete(productId);

    fs.unlink(`uploads/${deletedProduct.filename}`,err=>{
        if(err) throw err;
        console.log('Image successfully deleted from fs',deletedProduct.filename)
    })

    res.json({
        product:deletedProduct
    })


  } catch (error) {
    res.status(500).json({
      errorMsg: "Please try again later",
    });
  }
};
