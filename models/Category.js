const mongoose= require('mongoose')

const categorySchema= new mongoose.Schema({
    category:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    }
},{timestamps:true});

const category =mongoose.model('Category',categorySchema);

module.exports=category;