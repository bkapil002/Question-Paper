const ProductPaper = require('../Module/ProductPaper')
const updatePremissing  = require('../heplers/premissing')
async function updatePaper(req, res) {
    try {
        const userId = req.userId;
        if (!updatePremissing(userId)) {
          throw new Error("Permission denied");
        }
        
        const { _id, ...resBody } = req.body;
        const updatedProduct = await ProductPaper.findByIdAndUpdate(_id, resBody, { new: true });
    
        res.json({
          data: updatedProduct,
          success: true,
          error: false,
          message: "Product updated successfully"
        });
      } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({
          error: true,
          message: err.message || "Failed to update product",
          success: false
        });
      }
}

module.exports = updatePaper