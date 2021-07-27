const mongoose=require('mongoose')
const {ObjectId}= mongoose.Schema;

const productSchema= new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true,
        trim:true,
    },
    productDesc:{
        type:String,
        trim:true,
    },
    productPrice:{
        type:Number,
        required:true,
    },
    productCategory:{
        type :ObjectId,
        ref:"Category",
        required:true,
    },
    productQty:{
        type:Number,
        required:true,
    }
},{timestamps:true})

const Product=mongoose.model('Products',productSchema);
module.exports=Product;