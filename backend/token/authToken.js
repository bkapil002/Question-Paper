const TOKEN_KEY = "DFSFSVVGRGSR"
const jwt = require('jsonwebtoken');

async function authToken(req,res , next){
    try{
      const token = req.cookies?.token
      if(!token){
        return res.status(400).json({
            message : "User not login",
            error : true,
            success : false
         })
      }
      jwt.verify(token , TOKEN_KEY  , function(err , decoded){
        console.log(err)
        console.log(decoded)
        if(err){
            console.log(err)
        }
        req.userId = decoded?.id
        next()
      })
    }catch(err){
        res.status(400).json({
            message : err.message || err ,
            data : [],
            error : true,
            success : false
         })
    }
}
module.exports = authToken