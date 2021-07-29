const Product=require('../models/Product')
exports.create=async (req,res)=>{
    const {filename}=req.file;
    const {productName,productDesc,productPrice,productCategory,productQty}=req.body;

    try{
        const product = new Product();
        product.filename=filename;
        product.productName=productName;
        product.productDesc=productDesc;
        product.productPrice=productPrice;
        product.productCategory=productCategory;
        product.productQty=productQty;

        await product.save();
        res.status(200).json({
            successMsg:`${productName} was added`,
            product
        })

    }catch(error){
        res.status(500).json({
            errorMsg:"Please try again later"
        })
    }
}

exports.readAll=async (req,res)=>{
    try{
        const products=await Product.find({}).populate('productCategory','category')

        res.json({products});

    }catch(error){
        res.status(500).json({
            errorMsg:"Please try again later"
        })
    }
}