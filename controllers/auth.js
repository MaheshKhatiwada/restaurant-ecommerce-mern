const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
// const {jwtSecret,jwtExpire}=require('../config/keys')

exports.signupControllers = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        errorMsg: "Email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    return res.json({
      successMsg: "Successful Registration!!!",
    });
  } catch (error) {
    return res.status(500).json({
      errorMsg: "Server error ",
    });
  }
};

exports.signinControllers = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errorMsg: "Invalid Credentials!!!",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMsg: "Invalid Credentials!!!",
      });
    }
    const payload={
      user:{
        _id:user._id,
      }
    }
    jwt.sign(payload,process.env.jwtSecret,{expiresIn:process.env.jwtExpire},(err,token)=>{
      if(err) console.log('jwt error',err)
      const {_id,username,email,role}=user;
      res.json({
        token,
        user:{_id,username,email,role},
      })
    })

  } catch (error) {
    res.status(500).json({
       errorMsg: "Server Error",
     });
  }
};
