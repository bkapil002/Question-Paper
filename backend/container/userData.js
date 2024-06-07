const UserModel = require('../Module/User')

async function userData (req ,  res){
   try{
        console.log('user' , req.userId)
        const User = await UserModel.findById(req.userId)

        res.status(200).json({
            data : User,
            message : "User Data",
            success : true,
            error: false
        })
   }catch(err){
    res.satatus(400).json({
        message : err.message || err,
        success : false,
        error : true
    })
   }
}
module.exports = userData