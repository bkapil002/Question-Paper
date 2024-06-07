const ProductPaper = require('../Module/ProductPaper')

const DeletePaper = async (req , res)=>{
    try {
        const paperId = req.params.id;
         await ProductPaper.findByIdAndDelete(paperId);

         res.json({
            success: true,
            message: 'Paper deleted successfully , and Refresh please',
          });
        
    } catch (err) {
        res.json({
            success: false,
            error: true,
            message: err.message || err
        });
    }
}

module.exports = DeletePaper