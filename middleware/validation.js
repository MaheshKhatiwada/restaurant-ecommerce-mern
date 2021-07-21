const { check ,validationResult} = require('express-validator');

exports.signUpValidator=[
    check('username')
        .not().isEmpty().withMessage('All fields are required'),
    check('email')
        .isEmail().normalizeEmail().withMessage('Invalid email'),
    check('password')
        .isLength({min:6}).withMessage('Password must be at least 6 characters long')
]
exports.validatorResult=(req,res,next)=>{

    const result =validationResult(req);
    const hasErrors= !result.isEmpty()

    if(hasErrors){
        const firstError=result.array()[0].msg;
        return res.status(400).json({
            errorMsg:firstError,
        })
    }
    next();
}