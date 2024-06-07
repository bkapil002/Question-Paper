const UserModel = require('../Module/User')

async function userUser(req , res){
    try{
       console.log('user header' , req.userId)
       const alluser = await UserModel.find()  

       res.status(200).json({
           data : alluser,
           message : "User Data",
           success : true,
           error: false
       })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}

module.exports = userUser