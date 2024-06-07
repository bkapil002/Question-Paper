const ProductPaper = require('../Module/ProductPaper')
const getPaper = async(req,res)=>{
     try{
         const allPaper = await ProductPaper.find().sort({createdAt : -1})
         res.json({
            data : allPaper,
            message : "Paper",
            success : true,
            error : false
         })
     }catch(err){
         res.json({
             message: err.message || err,
             success : false,
             error : true
         })
     }
}
module.exports = getPaper