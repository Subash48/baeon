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

      Advertiser.find({}).then((adv)=>{

          let advDisplay = [];
          adv.forEach((advOne)=>{

                  advDisplay.push({
                    "businessName" :advOne.businessName,
                    "id" : advOne._id,
                    "price" : advOne.basePrice + req.body.noOfCoupons === null ? 0 : req.body.noOfCoupons*advOne.perCoupon,
                  })

          });
          res.status(200).json({ advertisers : advDisplay });
      }).catch((err) => console.log(err));

});



module.exports = advertiserRouter;
