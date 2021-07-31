const mongoose=require('mongoose')
require('dotenv').config()

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.CONNECTION_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:true,
        })
        console.log('Connection to database successful')
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDB;