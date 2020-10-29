const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const couponSchema = new mongoose.Schema({

            merchantId : {
                type : String,
                required : true
            },
            couponTitle : {
                type: String,
                required: true,
                maxlength : 20,
            },
            couponDescription : {
                type : String
            },
            noOfCoupons :{
                type: Number,
                min : 10,
                required : true
            },
            promoCodes : {
                type: Array,
                required : true
            },
            // promoCode: {
            //     type: String,
            //     require: true,
            //     unique: true
            // },
            isPercent: {
                type: Boolean,
                require: true,
                default: true
            },
            amount: {
                type: Number,
                required: true
            }, // if is percent, then number must be ≤ 100, else it’s amount of discount
            expireDate:
            {
                type: String,
                require: true,
                default: ''
            },
            isActive:
            {
                type: Boolean,
                require: true,
                default: true
            },
            couponImage : { type : String },
            radius   : {
                type : Number
            },
            lat : {
                type: Number
            },
            long :
            {
                type :Number
            },
            promoCodes : {
                type : Array
            },
            couponUsed : {
                type : Number
            },
            merchants :{
                type : Array
            },
            businessName : {
                type : String
            },
            code: {
                type : String
            },
            products : {
                type : Array
            },
            conversionFactor : {
                type : Number
            },
            startDate : {
                type : String
            },
            status: {
              type: String
            }
        },
    {
        collection: 'couponDetails',
        unique: 'true'
    });

module.exports = mongoose.model('Coupon',couponSchema);
