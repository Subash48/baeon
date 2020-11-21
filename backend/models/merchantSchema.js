
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const merchantSchema = new mongoose.Schema({

            email : {
                type: String,
                required : true,
                unique : true,
                trim : true,
                minlength : 3
            },
            businessName : {
                type: String,
                required: true,
                maxlength : 40,
            },
            firstName : {
                required: true,
                type: String,
                maxlength : 20,
            },
            lastName : {
                required: true,
                type: String,
                maxlength : 20,
            },
            businessEmail :{
                type: String,
                required: true,
                trim : true,
                minlength : 3
            },
            businessPhone : {
                type: String,
                required : true,
                minlength : 8
            },
            businessPhoneExtension :{
                type : String
            },
            businessAddress_1 :{
                type: String,
            },
            businessAddress_2 : {
                type : String
            },
            city : {
                type : String,
            },
            state : {
                type : String,
            },
            zipCode : {
                type : String,
            },
            country : {
                type : String,
            },
            lat :{
                type : Number,
            },
            long : {
                type : Number,
            },
            /*basePrice : {
               type : Number
            },
            baseType : {
              type: String
            },
            baseReturn : {
              type : Number
            } */


    },
    {
        collection: 'merchantDetails',
        unique: 'true'
    });

module.exports = mongoose.model('Merchant',merchantSchema);
