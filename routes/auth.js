const express=require('express');
const router=express.Router();
const { signupControllers } = require('../controllers/auth');
const {signUpValidator,validatorResult}=require('../middleware/validation')

router.post('/signup',signUpValidator,validatorResult,signupControllers)

module.exports=router;