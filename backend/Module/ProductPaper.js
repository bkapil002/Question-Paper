const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProductPaperSchema = new Schema({
    subject :  { type: String, required: true },
    year : Number,
    semester : String,
    paper : [],
    date: { 
        type: Date, 
        default: Date.now 
    },
})

const ProductPaper = mongoose.model('Paper', ProductPaperSchema);
module.exports = ProductPaper