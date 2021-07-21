const express=require('express');
const router=express.Router();
const {signUpValidator,validatorResult}=require('../middleware/validation')

router.post('/signup',signUpValidator,validatorResult)

module.exports=router;