const express = require('express');
const merchantRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');
const Merchant = require('../models/merchantSchema');
const Product = require('../models/productSchema');
const Advertiser = require('../models/advertiserSchema');
const Coupon = require('../models/couponSchema');
const userSchema = require('../models/userSchema');
const uuidAPIKey = require('uuid-apikey');


// passport.authenticate('jwt',{session : false})
// Merchant addition
merchantRouter.post('/add',passport.authenticate('jwt',{session : false}),function(req,res){


    //console.log(req.cookie);
    //console.log(req.headers['email']);
    // res.json({ try : 'test'});
    console.log(req.body);
    const newMerchant = new Merchant(
        {
            "email" :  req.user.email, //req.headers['email'],
            "businessName" : req.body.businessName,
            "firstName"    : req.body.firstName,
            "lastName"     : req.body.lastName,
            "businessEmail" : req.body.businessEmail,
            "businessPhone" : req.body.businessPhone,
            "businessPhoneExtension" : req.body.businessPhoneExtension,
            "businessAddress_1"  : req.body.businessAddress_1,
            "businessAddress_2"  : req.body.businessAddress_2,
            "city"               : req.body.city,
            "state"              : req.body.state,
            "zipCode"            : req.body.zipCode,
            "country"            : req.body.country === undefined ? "India" : req.body.country,
            "lat"                : req.body.lat,
            "long"            : req.body.long,
            "basePrice" : req.body.basePrice, //Conversion fee
            "baseType" :  req.body.baseType,  // Percentage or Flat
            "baseReturn" : req.body.baseReturn //Non-Conversion rate
         }
        );
        //console.log(newMerchant);
        newMerchant.save()
            .then((data)=> {

                userSchema.findOneAndUpdate({ email : data.email },{ role : "merchant"})
                .then(() =>{
                    res.status(201).json({ msg : 'Merchant details added successfully' } );
                })

            })
            .catch((err)=> {
              console.log(err);
              res.status(422).json({ msg : err });
            })

});
//passport.authenticate('jwt',{session : false})
merchantRouter.get('/profile',passport.authenticate('jwt',{session : false}),function(req,res){


    //console.log(String(req.query.email));
    // res.json({ try : 'test'});
    Merchant.findOne({ email : req.user.email })
    .then((data)=>{
            if(data === null)
            {
                res.json({ err : 'Merchant does not exist'});
            }
            else{

                let pro =
                    {
                        businessName : data.businessName,
                        firstName : data.firstName,
                        lastName : data.lastName,
                        businessEmail : data.businessEmail,
                        businessPhone : data.businessPhone,
                        businessAddress_1 : data.businessAddress_1,
                        businessAddress_2 : data.businessAddress_2,
                        city : data.city,
                        state : data.state,
                        zipCode : data.zipCode,
                        basePrice : data.basePrice
                    };
                console.log(pro);
                res.json( {profile : pro });
            }
    }).catch((err)=> res.status(422).json({ msg : err }))

});

//API key generation passport.authenticate('jwt',{session : false})
merchantRouter.get('/generateApiKey', passport.authenticate('jwt',{session : false}), async (req,res)=>{

 const filter = { email : req.user.email };

 const api = await uuidAPIKey.create();
 const update = { apikey: api['apiKey']  };
 userSchema.findOneAndUpdate(filter, update)
   .then(()=>{
    res.json({
        apikey : update.apikey
    })
   })
   .catch((err)=>{
       res.json({
           error : err
       })
   })
});

//
merchantRouter.get('/getApiKey', passport.authenticate('jwt',{session : false}), async (req,res)=>{


    userSchema.findOne({ email : req.user.email })
      .then((val)=>{

       if(val.apikey === undefined)
       {
           res.json({
               err : 'You have not generated an api key'
           })
       }
       res.json({
           apikey : val.apikey
       })
      })
      .catch((err)=>{
          res.json({
              error : err
          })
      })
   });

// passport.authenticate('jwt',{session : false}),
// Product addition under merchant inventory
merchantRouter.post('/addProduct',passport.authenticate('jwt',{session : false}),(req,res)=>{
    console.log(req.user.email+' wdcw');
    Merchant.findOne({ email : req.user.email })
    .then((user)=>{
        const newProduct = new Product(
            {
                "merchantId" : user._id,
                "productName" : req.body.productName,
                "productDesc" : req.body.productDesc,
                "stock"    : req.body.stock,
                "unitPrice"     : req.body.unitPrice,
            }
            );
            console.log(newProduct);
            newProduct.save()
                .then(()=> res.status(201).json({ msg : 'Product details added successfully' } ))
                .catch((err)=> res.status(422).json({ msg : 'There was an error in the product details' }))
    })
    .catch(()=>{
        res.json({ msg : 'There was an error finding the merchant details for your account !'})
    })

})
//passport.authenticate('jwt',{session : false})
// Retrieving details of products from merchant's inventory
merchantRouter.get('/getProduct',passport.authenticate('jwt',{session : false}),(req,res)=>{

    Merchant.findOne({ email : req.user.email })
    .then((user)=>{
      Product.find({ merchantId : user._id })
      .then((products)=>{

        product = [];
        products.forEach((pro)=>{
            product.push(({
                id : pro._id,
                productDesc : pro.productDesc,
                productName : pro.productName,
                stock : pro.stock,
                unitPrice : pro.unitPrice
            }))
        })
        res.json({ product : product });
      })
      .catch((err)=>{
          res.json({ error : err.message})
      })
    })
    .catch((err)=>{
        res.json({ msg : 'There was an error finding the merchant details for your account !',})
    })
});

// Delete details of products from merchant's inventory
merchantRouter.get('/deleteProduct',passport.authenticate('jwt',{session : false}),(req,res)=>{

    Merchant.findOne({ email : req.user.email })
    .then((user)=>{
      Product.findOne({ merchantId : user._id })
      .then((products)=>{

        product = [];
        products.forEach((pro)=>{
            product.push(({
                id : pro._id,
                productDesc : pro.productDesc,
                productName : pro.productName,
                stock : pro.stock,
                unitPrice : pro.unitPrice
            }))
        })
        res.json({ product : product });
      })
      .catch((err)=>{
          res.json({ error : err.message})
      })
    })
    .catch((err)=>{
        res.json({ msg : 'There was an error finding the merchant details for your account !',})
    })
});


// Addition of new coupon to product in inventory
merchantRouter.post('/addCoupon',passport.authenticate('jwt',{session : false}),(req,res)=>{

    Merchant.findOne({ email : "crescita2020@gmail.com" })
    .then((user)=>{
    const newPromotion = new Coupon({
        "merchantId" : user._id,
        "productId"  : req.body.productId,
        "couponTitle" : req.body.couponTitle,
        "couponDescription" : req.body.couponDescription,
        "discount" : req.body.discount,
        "noOfCoupons": req.body.noOfCoupons,
        "geometry" : {
            "coordinates" : [20,80]
        },
        "radius" : 10

    })
    newPromotion.save()
    .then((data)=> res.status(201).json({ msg : 'Promotion details added successfully', promoCode : data._id } ))
    .catch((err)=> res.status(422).json({ msg : 'There was an error in the promotion details'+err }))
    })
    .catch((err)=> res.json({ error : err.message }));

});


merchantRouter.get('/getCoupons',passport.authenticate('jwt',{session : false}),(req,res)=>{

    Merchant.findOne({ email : "crescita2020@gmail.com" })
    .then((user)=>{
      Coupon.find({ merchantId : user._id })
      .then((coupons)=>{
        var coupon = [];
        coupons.forEach((coup)=>{

        var couponAvailed = 0;
        for(let i = 0 ; i< Number(coup.noOfCoupons);i++)
        {
        //promoCodes.push( String(req.body.couponTitle.slice(0,5).toUpperCase())+i)
             if(coup['promoCodes'][i]['used'] === true)
            {
                couponAvailed = couponAvailed + 1;
            }
        }

        console.log(coup.isActive);
            coupon.push(({
                id : coup._id,
                status : coup.isActive === true ? "Active" : "Expired",
                type : coup.isPercent === true ? "Discount": "Flat",
                amount    : coup.amount,
                couponTitle : coup.couponTitle,
                couponDescription : coup.couponDescription,
                startDate : "YYYY-MM-DD",
                noOfCoupons : coup.noOfCoupons,
                code : coup.code,
                couponUsed : coup.couponUsed,
                couponAvailed : couponAvailed,

            }))
        })
        res.json({ coupon : coupon , count : coupon.length });
      })
      .catch((err)=>{
          console.log(err);
          res.json({ error : err.message})
      })
    })
    .catch((err)=>{
        console.log(err);
        res.json({ msg : 'There was an error finding the merchant details for your account !',})
    })
});


merchantRouter.get('/getProductsByApi',(req,res)=>{
    // User.findOne({apikey : req.query.apikey })
    // .then((user)=>{
    Merchant.findOne({ email : "crescita2020@gmail.com" })
    .then((users)=>{

        Product.find({ merchantId : users._id})
        .then((prods)=>{
            product = [];
            prods.forEach((pro)=>{
            product.push(({
                id : pro._id,
                productDesc : pro.productDesc,
                productName : pro.productName,
                stock : pro.stock,
                unitPrice : pro.unitPrice
            }));
            });
            Advertiser.find({}).then(async (adv)=>{

                let advDisplay = [];
                adv.forEach((advOne)=>{

                        advDisplay.push({
                            "businessName" :advOne.businessName,
                            "id" : advOne._id,
                            "amount" : advOne.basePrice,
                        })

                });
                console.log(product);
                res.json({ products : product,  advertisers : advDisplay , lat : users.lat , long : users.long } );

            }).catch((err) => console.log(err))

        }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
//}).catch((err) => console.log(err));
})


// merchantRouter.get('/getMerchants',(req,res)=>{
//
//     User.findOne({apikey : req.query.apikey })
//     .then((user)=>{
//     // Merchant.findOne({ email : user.email })
//     // .then((users)=>{
//
//
//         Merchant.find({}).then(async (merch)=>{
//
//             let merchantDisplay = [];
//             merch.forEach((merchOne)=>{
//                 if(merchOne.email != user.email)
//                 {
//                     merchantDisplay.push({
//                         "businessName" :merchOne.businessName,
//                         "id" : merchOne._id,
//                         "basePrice" : merchOne.basePrice
//                     })
//                 }
//             });
//             res.json({ merchant : merchantDisplay });
//         }).catch((err) => console.log(err))
//
// }).catch((err) => console.log(err))
// });

module.exports = merchantRouter;
