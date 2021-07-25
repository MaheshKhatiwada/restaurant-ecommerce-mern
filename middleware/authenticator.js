const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

exports.authenticateJWT = (req, res, next) => {
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            errorMsg:"No token .Authorization denied"
        })
    }
    try{
        const decoded=jwt.verify(token,jwtSecret);
        req.user=decoded.user;
        next();
    }catch(error){
        res.status(401).json({
            errorMsg:"Invalid token"
        })
    }
};
