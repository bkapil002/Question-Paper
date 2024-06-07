const ProductPaper = require('../Module/ProductPaper')
const updatePremissing  = require('../heplers/premissing')
async function uplaodePaper (req,res){

    try{

        const sectionUserId = req.userId
        if(!updatePremissing(sectionUserId)){
            throw new Error("you are not authorized")
        }

        const UploadProduct = new  ProductPaper(req.body)
        const saveProduct = await UploadProduct.save()
        res.status(200).json({
            message : "product uploade",
            data : saveProduct,
            error : false,
            success : true
        })
   }catch(err){
    res.status(400).json({
        message : err.message || err ,
        error : true,
        success : false
     })
   }

}
module.exports = uplaodePaper