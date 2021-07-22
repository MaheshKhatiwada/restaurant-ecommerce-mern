const User = require("../models/User");
const bcrypt = require("bcryptjs");
exports.signupControllers = async (req, res) => {
    const {username,email,password}=req.body;
  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return  res.status(400).json({
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

   return  res.json({
      successMsg: "Successful Registration!!!",
    });
    console.log('successful registration')
  } catch (error) {
      return res.status(500).json({
          errorMsg:'Server error '
      })
  }
};
