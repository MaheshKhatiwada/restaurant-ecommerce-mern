exports.create=async (req,res)=>{
    console.log('Body is',req.body)
    console.log('Image is',req.file)

    res.status(200).json({
        message:"File uploaded"
    })
}