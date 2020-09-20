
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const statSchema = new mongoose.Schema({
     
            noOfUsers :{
                type: Number,
                required : true
            },
            noOfMerchants : {
                type : Number,
                required : true
            },
            // merchants :[ 
            //     { 
            //     merchantName : String,
            //     merchantId   : String,
            //     noOfPromos   : Number 
            // },
            codes : {
                type : Array
            }
        
            
    },
    {
        collection: 'statDetails',
        unique: 'true'
    });
    
module.exports = mongoose.model('Stats',statSchema);
