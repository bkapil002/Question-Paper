async function userLogout (req, res){
     try{
         res.clearCookie('token')
         res.json({
             message : "Logout Successfull",
             success : true,
             error : false,
             data : []
         })
     }catch(err){
         res.json({
             message: err.message || err,
             success : false,
             error : true
         })
     }
}
module.exports = userLogout