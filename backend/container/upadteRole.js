const UserModel = require('../Module/User')


async function upadateRole (req , res){
    try{
       const sessUser = req.userId
       const {userId , email , role , name} = req.body
       const payload = {
        ...(email && {email}),
        ...(name && {name}),
        ...(role && {role}),
       }
       const user = await UserModel.findById(sessUser)
       console.log('userRale:',user.role)
       const userUpdate = await UserModel.findByIdAndUpdate(userId, payload , {new : true})

       res.status(200).json({
           data : userUpdate,
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

module.exports  = upadateRole