const UserModel  = require('../Module/User')
const bcrypt = require('bcrypt')
async function userSigin(req , res){
    try{
          const{name , password ,email} = req.body
          let user = await UserModel.findOne({email})
          if(user){
            return res.status(200).json('Email is already register')
          }
          console.log(req.body)
          if(!name){
            throw new Error("Please Provide Name")
          }
          if(!email){
            throw new Error("Please Provide Email")
          }
          if(!password){
            throw new Error("Please Provide Password")
          }

          const salt = await bcrypt.genSalt(10)
          const hashPassword = await bcrypt.hashSync(password,salt)

          if(!hashPassword){
            throw new Error("Something is wrong")
          }
          
          const payload = {
            ...req.body,
            role : 'GENERAL',
            password :  hashPassword
          }

          const userData = await UserModel(payload)
          const saveUser = userData.save()

          res.status(201).json({
            data:saveUser,
            success : true,
            error : false,
            message : "connected sucessfully"
          })

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports = userSigin