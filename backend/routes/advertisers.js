const express = require('express');
const advertiserRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');
const Merchant = require('../models/merchantSchema');
const Product = require('../models/productSchema');
const Coupon = require('../models/couponSchema');
const Advertiser= require('../models/advertiserSchema');

/* Endpoint to calculate price */
advertiserRouter.post("/computePrice", (req, res) => {
  console.log('backend');

      
      Advertiser.find({}).then((adv)=>{
          console.log(adv);
          let advDisplay = [];
          adv.forEach((advOne)=>{

                  advDisplay.push({
                    "businessName" :advOne.businessName,
                    "id" : advOne._id,
                    "amount" : advOne.basePrice + (req.body.noOfCoupons === null ? 0 : req.body.noOfCoupons*advOne.perCoupon),
                  })

          });
          console.log('check point');
          res.json({ advertisers : advDisplay });
      }).catch((err) => console.log(err));
    
});



module.exports = advertiserRouter;
