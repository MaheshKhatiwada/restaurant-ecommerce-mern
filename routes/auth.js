const express=require('express');
const router=express.Router();
const { signupControllers,signinControllers } = require('../controllers/auth');
const {signUpValidator,signInValidator,validatorResult}=require('../middleware/validation')

router.post('/signup',signUpValidator,validatorResult,signupControllers)
router.post('/signin',signInValidator,validatorResult,signinControllers)


module.exports=router;