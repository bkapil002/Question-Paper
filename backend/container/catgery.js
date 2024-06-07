const ProductPaper = require('../Module/ProductPaper');

const catgery = async (req, res) => {
    try {
      const {subject} = req?.body || req?.query
      const products = await ProductPaper.find({subject});
      console.log(products)
        res.status(200).json({
            data: products,
            message: 'Distinct categories retrieved successfully.',
            error: false,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = catgery;
