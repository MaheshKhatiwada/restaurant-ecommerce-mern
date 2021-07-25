exports.categoryController=(req,res)=>{
    setTimeout(()=>{
        res.json({
            successMsg:`${req.body.category} added`
        })
    },2000)
}