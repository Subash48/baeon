
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const advertiserSchema = new mongoose.Schema({

            email : {
                type: String,
                required : true,
                unique : true,
                trim : true,
                minlength : 3
            },
            businessName :{
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
              },
            basePrice : {
                type : Number
            },
            perCoupon : {
              type : Number
            }


    },
    {
        collection: 'advertiserDetails',
        unique: 'true'
    });

module.exports = mongoose.model('Advertiser',advertiserSchema);
