
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const productSchema = new mongoose.Schema({
    
            merchantId : {
                type : String,
                required : true
            },
            productName : {
                type: String,
                required: true,
                minlength : 2,
                maxlength : 20,
            },
            productDesc : {
                type : String
            },
            stock :{
                type : Number
            },
            unitPrice :{
                type: Number,
                required : true
            },
            
    },
    {
        collection: 'productDetails',
        unique: 'true'
    });
    
module.exports = mongoose.model('Product',productSchema);
