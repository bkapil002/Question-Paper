const UserModel  = require('../Module/User')
const bcrypt = require('bcrypt')
const TOKEN_KEY = "DFSFSVVGRGSR"
const jwt = require('jsonwebtoken');


async function userLogin (req,res){
  try{
    const{password , email} = req.body
    if(!email){
        throw new Error("Please Provide Email")
    }
    if(!password){
        throw new Error("Please Provide Password")
    }

    let user  = await UserModel.findOne({email})
    if(!user){
        throw new Error("User Not Found")
    }
    const isPassword = await bcrypt.compare(password,user.password )
    console.log(isPassword)

    if(isPassword){
        const tokenData = {
            id : user.id,
            email : user.email
        }
        console.log('TOKEN_KEY:',TOKEN_KEY)
        console.log('userData',tokenData)
        
        const token = await jwt.sign(tokenData,TOKEN_KEY, { expiresIn: 60 * 60 })

        console.log('token:',token)
        const tokenOption = {
            httpOnly : true,
            secure : true,
        }

        res.cookie('token', token, tokenOption)
        return res.status(200).json({
            message : "login Successfull",
            data: token,
            success : true,
            error : false
        })
    }else{
        throw new Error('Please check password')
    }
  }catch(err){
    res.json({
        message : err.message || err,
        error : true,
        success : false
    })
  }
}

module.exports = userLogin