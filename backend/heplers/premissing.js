const UserModel = require('../Module/User')

const updatePremissing = async(userId)=>{
    const user = await UserModel.findById(userId);
       
      if(user && user.role === 'ADMIN'){
        return true
      }
      return false
}

module.exports = updatePremissing