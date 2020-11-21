const express = require('express');
const apiRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');
const Merchant = require('../models/merchantSchema');
const Product = require('../models/productSchema');
const Coupon = require('../models/couponSchema');
const Advertiser= require('../models/advertiserSchema');
const Stat = require('../models/statSchema');
const key = require('../config/auth');
const multer = require("multer");
const geo = require('node-geo-distance');
const couponSchema = require('../models/couponSchema');
var path = require('path');
const User = require('../models/userSchema');
const ObjectId = require('mongodb').ObjectID;
const Razorpay = require("razorpay");
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const request = require('request');
sgMail.setApiKey('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');

let instance = new Razorpay({
    key_id: key.RAZOR_KEY,
    key_secret: key.RAZOR_SECRET
  });



const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename : function(req,file,cb){
        cb(null,Date.now()+ file.originalname);
    }
});


const fileFilter = (req,file,cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null,true);
    else
        cb(null,false);
}
const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024*1024*5
    },
    fileFilter : fileFilter
});

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'contact@baeon.co',
        pass: ''
    }
});

apiRouter.get('/',passport.authenticate('headerapikey', { session: false, failureRedirect: '/api/unauthorized' }),(req,res)=>{
    res.json({
        message : 'Welcome to the API for Q-UP !'
    })
});

apiRouter.get('/unauthorized',(req,res)=>{
    res.json({
        message : 'Api key seems to be invalid'
    })
});


apiRouter.post('/promotion/add',passport.authenticate('headerapikey',{ session : false , failureRedirect : '/api/unauthorized'}),upload.single('couponImage'),(req,res)=>{
    Merchant.findOne({ email : req.user.email })
    .then((user)=>{


    if(!req.body.couponTitle)
    {
        res.json({  error : "Title for coupon field is missing "})
    }
    else if(!req.body.noOfCoupons)
    {
        res.json({  error : "Number of coupons field is missing "})
    }
    else if(!req.body.amount)
    {
        res.json({  error : "Amount field is missing "})
    }
    else
    {
    var promoCodes = [];
    for(let i = 0 ; i< Number(req.body.noOfCoupons);i++)
    {
        promoCodes.push( String(req.body.couponTitle.slice(0,5).toUpperCase())+i)
    }

    console.log(promoCodes);
    const newPromotion = new Coupon({
        "merchantId" : user._id,
        // "productId"  : req.body.productId,
        "couponTitle" : req.body.couponTitle,
        "couponDescription" : req.body.couponDescription,
        "noOfCoupons": req.body.noOfCoupons,
        "isPercent"  : req.body.isPercent,
        "amount"     : req.body.amount,
        "expireDate" :  req.body.expireDate === undefined ? '' : req.body.expireDate,
        "geometry"   : { coordinates : [Number(req.body.long),Number(req.body.lat)] },
        "radius"     : req.body.radius,
        "couponImage"  : req.file.path === undefined ? '' : req.file.path,
        "isActive"   : true,
        "promoCodes" : promoCodes
    })
    newPromotion.save()
    .then((data)=> res.status(201).json({ msg : 'Promotion details added successfully' } ))
    .catch((err)=> res.status(422).json({ msg : 'There was an error in the promotion details'+err }))
    }})
    .catch((err)=> res.json({ error : err.message }));

});


//  /getpromotion?lat=latVal&lng=lngVal
apiRouter.get('/getpromotion',passport.authenticate('headerapikey',{ session : false , failureRedirect : '/api/unauthorized'}),(req,res)=>{

    Merchant.findOne({ email : req.user.email })
    .then((user)=>{
    //   Coupon.find({ merchantId : user._id })
    //   .then((products)=>{
    //     res.json(products);
    //   })
    //   .catch((err)=>{
    //       res.json({ error : err.message})
    //   })  Coupon.geoNear(
    //     {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
    //     {maxDistance: 100000, spherical: true}
    // ).then(function(coupons){
    //     res.send(coupons);
    // }).catch((err) => {
    //     console.log(err)
    // });

    // const coord1 = {
    //     latitude:  Number(req.query.lat),
    //     longitude:  Number(req.query.lng)
    //   }
    Coupon.find({ merchantId : user._id })
    .then((users)=>{
        const coupons = []
        users.forEach((user)=>{
            //console.log(user['geometry']['coordinates'][0]);
            let coord2 = {
                latitude :  user.lat,
                longitude : user.long
            }
            //console.log(user);
            coupons.push(user);
            // let coord2 = {
            //     latitude : Number(user['geometry']['coordinates'][1]),
            //     longitude : Number(user['geometry']['coordinates'][0])
            // };
            var coord1 = {
                latitude: Number(req.query.lat),
                longitude: Number(req.query.long)
              }
            //   var coord2 = {
            //     latitude: 38.8977330,
            //     longitude: -77.0365310
            //   }
              // Washington Monument
            //    var coord1 = {
            //     latitude: 38.8894840,
            //     longitude: -77.0352790
            //   }
            // geo.vincenty(coord1, coord2, function(dist) {
            //     if(dist <= user.radius)
            //     {
            //         coupons.push(user);
            //     }
            //     console.log(dist);
            //   });
              var vincentyDist = geo.vincentySync(coord1, coord2);
              console.log(vincentyDist)
        })
        res.send(coupons);
    })
    .catch((err)=>{
        res.send(err);
    })


})

    // Coupon.geoNear({
    //     type : 'Point',
    //     coordinates : [parseFloat(req.query.lng), parseFloat(req.query.lat)],
    //     {maxDistance: 100000, spherical: true}
    // ).then(function(ninjas){
    //     res.send(ninjas);
    // }).catch(next);
// });
    .catch((err)=>{
        res.json({ msg : 'There was an error finding the merchant details for your api key !'+err})
    })
});

apiRouter.post('/addImage',upload.single('couponImage'),(req,res)=>{

    console.log(req.file.path);
    res.send('Success');
});

apiRouter.post('/check',(req,res)=>{
    if(!req.body.name)
    {
        res.send('null');
    }
    else{
    console.log(req.body.name);
    res.send('work');
    }
})


apiRouter.get('/distance',(req,res)=>{

            var coord1 = {
                latitude: Number(req.query.lat),//38.8977330,
                longitude: Number(req.query.long)//80.2571658
              }
              console.log(coord1);
            //   var coord2 = {
            //     latitude:   req.query.lat,// 38.8977330,
            //     longitude:  req.query.long// -77.0365310
            //   }
              // Washington Monument
            User.findOne({ apikey : req.query.apikey}).
            then((userr)=>{
                Merchant.findOne({ email : userr.email })
                .then((merch)=>{

                    var coord2 = {
                        latitude: merch.lat,//39.8894840,
                        longitude: merch.long
                      }
                      console.log(coord2);
                    geo.vincenty(coord1, coord2, function(dist) {
                        console.log(dist);
                      });
                      var vincentyDist = geo.vincentySync(coord1, coord2);
                      res.send(vincentyDist)
                }).catch((err) => res.send(err))
            }).catch((err) => res.send(err))

});







apiRouter.get('/viewcoupons',(req,res)=>{

    User.findOne({ apikey: req.query.apikey })
    .then((user)=>{
        Merchant.findOne({ email : user.email })
        .then((individual) =>{
        Coupon.find({ merchantId :  individual._id})
            .then((coupons)=>{
        res.send(coupons);
    })
    .catch((err)=>{
        res.send(err);
    })
})
.catch((err) => res.send(err))
    })


   .catch((err)=>{
        res.json({ msg : 'There was an error finding the merchant details for your api key !'+err})
    })
})


apiRouter.post('/getCoupon',(req,res)=>{

    User.findOne({apikey : req.query.apikey })
    .then((user)=>{
    Merchant.findOne({ email : user.email })
    .then((individual)=>{
        Coupon.findOne({ merchantId :  individual._id})
            .then(async (coupon)=>{
                //console.log(individual);
                console.log(coupon);
                     var index = coupon[0]['couponUsed'];
                     //console.log(coupon[0])
                     Coupon.findByIdAndUpdate({ _id : coupon._id },{ couponUsed : index +1 })
                         .then((s)=>{
                            if( coupon['isActive'] === true)
                                 {
                                    res.send(coupon['promoCodes'][index]);
                                 }
                                    }).catch((err)=> res.send(err))
                                         }).catch((err) => res.send(err + ' jn'))
                }).catch((err)=> res.send(err))
    }).catch((err)=> res.status(422).json({ error : 'Invalid API key !'}));

});


apiRouter.get('/myinventory',(req,res)=>{

    User.findOne({apikey : req.query.apikey })
    .then((user)=>{
    Merchant.findOne({ email : user.email })
    .then((users)=>{

        Product.find({ merchantId : users._id})
        .then((prods)=>{
            const products = [];
            console.log(prods);
            prods.forEach((prod)=>{
                products.append(prod);
            })
        }).catch((err) => res.json({ error : 'Error finding Products for your account '}))
    }).catch((err) => res.json({ error : 'Could not find a Merchant account for this key '}))

}).catch((err) => res.json({ error : 'Invalid API key'}))
});


apiRouter.post('/addProduct',(req,res)=>{
    User.findOne({apikey : req.query.apikey })
    .then((users)=>{
    Merchant.findOne({ email : users.email })
    .then((user)=>{

        if(req.body.stock <0)
        {
            res.status(422).json({ error : 'Stock Value cannot be negative' })
        }
        else if( req.body.unitPrice <= 0)
        {
            res.status(422).json({ error : 'Price has to be positive number'})
        }
        else
        {
            const newProduct = new Product(
            {
                "merchantId" : user._id,
                "productName" : req.body.productName,
                "productDesc" : req.body.productDesc,
                "stock"    : req.body.stock,
                "unitPrice"     : req.body.unitPrice,
            }
            );
            console.log(user);
            newProduct.save()
                .then(()=> res.status(201).json({ msg : 'Product details added successfully' } ))
                .catch((err)=> res.status(422).json({ msg : 'There was an error in the product details', error :err }))
        }
    })
    .catch((err)=>{
        res.json({ msg : 'There was an error finding the merchant details for your api key !',})
    })
    })
    .catch((err) => res.send({ error : 'Api key is invalid !'+err}))

});






//Here


apiRouter.get('/couponPage',(req,res)=>{

    //res.sendFile(path.join(__dirname + '/couponadd.html'));
    User.findOne({apikey : req.query.apikey })
    .then((user)=>{
    Merchant.findOne({ email : user.email })
    .then((users)=>{

        Product.find({ merchantId : users._id})
        .then((prods)=>{
            // var products = [];
            // console.log(prods);
            // prods.forEach((prod)=>{
            //     products.append(prod);
            // })
            // latitude = users.lat ;
            // longitude = users.long;
            Merchant.find({}).then(async (merch)=>{

                //var filtered = merch.filter(function(el) { return el.email !== user.email; });
                //console.log(filtered);
                // var filtered = await merch.filter(function(el){
                //     return el['email'] != user.email
                // })
                let merchantDisplay = [];
                merch.forEach((merchOne)=>{
                    if(merchOne.email != user.email)
                    {
                        merchantDisplay.push({
                            "businessName" :merchOne.businessName,
                            "id" : merchOne._id,
                            "basePrice" : merchOne.basePrice
                        })
                    }
                });
               // console.log(merchantDisplay);
                res.render('couponadd.ejs', { products : prods,  merchants : merchantDisplay , lat : users.lat , long : users.long } );

            }).catch((err) => console.log(err))

        }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
}).catch((err) => console.log(err))
});



apiRouter.get('/getProductsByApi',(req,res)=>{
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
            Merchant.find({}).then(async (merch)=>{

                let merchantDisplay = [];
                merch.forEach((merchOne)=>{
                    if(merchOne.email != "crescita2020@gmail.com")
                    {
                        merchantDisplay.push({
                            "businessName" :merchOne.businessName,
                            "id" : merchOne._id,
                            "basePrice" : merchOne.basePrice,
                            "baseType"  : merchOne.baseType,
                            "baseReturn" : merchOne.baseReturn,
                            "amount" : merchOne.basePrice
                        })
                    }
                });
                console.log(product);
                res.json({ products : product,  merchants : merchantDisplay , lat : users.lat , long : users.long } );

            }).catch((err) => console.log(err))

        }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
//}).catch((err) => console.log(err));
})

// apiRouter.post('/addPromotion',upload.single('couponImage'),(req,res)=>{
//
//     User.findOne({apikey : req.body.apikey })
//     .then((users)=>{
//
//     Merchant.findOne({ email : users.email })
//     .then(async (user)=>{
//
//     console.log(req.body.amount);
//     if(!req.body.couponTitle)
//     {
//         res.json({  error : "Title for coupon field is missing "})
//     }
//     else if(!req.body.noOfCoupons)
//     {
//         res.json({  error : "Number of coupons field is missing "})
//     }
//     else if(!req.body.amount)
//     {
//         res.json({  error : "Amount field is missing "})
//     }
//     else if(!req.body.products)
//     {
//         res.json({ error : 'No product has been selected'})
//     }
//     else if(!req.body.merchants)
//     {
//         res.json({ error : 'No merchant has been selected'})
//     }
//     else
//     {
//     const promoCodes = [];
//     const id = await Math.random().toString(36).substring(7).toUpperCase();
//     console.log("random", id);
//     for(let i = 0 ; i< Number(req.body.noOfCoupons);i++)
//     {
//
//         let code ={
//             'promoCode' : String(id+i),
//             'used'    : false
//         };
//         promoCodes.push(code);
//     }
//     console.log(req.body.All);
//     const newPromotion = new Coupon({
//         "merchantId" : user._id,
//         // "productId"  : req.body.productId,
//         "couponTitle" : req.body.couponTitle,
//         "couponDescription" : req.body.couponDescription,
//         "noOfCoupons": req.body.noOfCoupons,
//         "isPercent"  : req.body.isPercent === "Discount" ? true :false,
//         "amount"     : req.body.amount,
//         "expireDate" :  req.body.expireDate === undefined ? '' : req.body.expireDate,
//         "radius"     : req.body.radius,
//         "lat"        : user.lat,
//         "long"       : user.long,
//         "couponImage"  :req.file == undefined ? '': req.file.path ,
//         "isActive"   : true,
//         "startDate"  : "YYYY-MM-DD",
//         "promoCodes" : promoCodes,
//         "couponUsed" : 0,
//         "products"  : req.body.products,//Number(req.body.All) === 1? ["All"] : req.body.products,
//         "merchants" : req.body.merchants,
//         "businessName" : user.businessName,
//         "code"         : id,
//     });
//
//     newPromotion.save()
//     .then((data)=>
//     {
//         let params = {
//             amount : req.body.price,
//             currency: "INR",
//             receipt: "su001",
//             payment_capture: '1'
//           };
//         instance.orders.create(params).then((data) => {
//                 res.send({"sub":data,"status":"success"});
//                 //res.render('payment.ejs',{ sub  : data })
//         }).catch((error) => {
//                 res.send({"sub":error,"status":"failed"});
//         })
//     //res.status(201).json({ msg : 'Promotion details added successfully' } ))
//     })
//     .catch((err)=> res.status(422).json({ msg : 'There was an error in the promotion details'+err }))
//     }})
//     .catch((err)=> res.json({ error : err.message }));
//
//
//
// }).catch((err)=> console.log(err));
// });


apiRouter.post('/displayCoupons',passport.authenticate('headerapikey',{ session : false , failureRedirect : '/api/unauthorized'}),(req,res)=>{

    //console.log(req.body);
    if(!req.body.apikey)
    {
        res.status(400).json({ err : 'Apikey missing in the request'});
    }
    else if(!req.body.lat || !req.body.long)
    {
        res.status(400).json({ err : 'Location credentials missing in request'});
    }
    else
    {
    User.findOne({apikey : req.body.apikey })
    .then((users)=>{
        if(users === null)
        {
            res.status(401).json({err : 'Invalid API key'});
        }
        else{
        var coord1 = {
            latitude: Number(req.body.lat),//38.8977330,
            longitude: Number(req.body.long)//80.2571658
          };
    Merchant.findOne({ email : users.email })
    .then((user)=>{
        var coupons= [];
        var id = user._id;
        Coupon.find({})
        .then((coups)=>{
            coups.forEach((coup)=>{
                if(coup['merchants'].includes(id))
                {
                    let coord2 = {
                        latitude: Number(coup.lat),//39.8894840,
                        longitude: Number(coup.long)
                      };
                    let vincentyDist = geo.vincentySync(coord1, coord2);
                    if(vincentyDist <=  coup.radius)
                        {
                            let detail ={
                                couponTitle : coup.couponTitle,
                                couponDesc : coup.couponDesc,
                                isPercent  : coup.isPercent,
                                couponId   : coup._id,
                                couponImageUrl : "http://localhost:5000/uploads/"+String(coup.couponImage).slice(8)
                            }
                            coupons.push(detail);
                        }
                }
            })
            res.send(coupons);

        }).catch((err) => res.status(401).json({ err : 'There was an error finding coupons for you'}));
    }).catch((err) => res.status(401).json({ err : 'There was an error finding your account'}));
}
}).catch((err) => res.status(401).json({err : 'Invalid API key'}))

    }

});


apiRouter.post('/getCouponCode',passport.authenticate('headerapikey',{ session : false , failureRedirect : '/api/unauthorized'}),(req,res)=>{

    User.findOne({apikey : req.body.apikey })
    .then((users)=>{
        var coord1 = {
            latitude: Number(req.body.lat),//38.8977330,
            longitude: Number(req.body.long)//80.2571658
          };
        console.log(users);
        console.log(coord1);
        console.log(ObjectId(req.params.id));
        //console.log( typeof ObjectId(req.query.couponId)) //_id : req.query.couponId
        Coupon.findOne({ _id : req.body.couponId })//_id : req.query.couponId
            .then( (coupon)=>{
                console.log(coupon);
                console.log( typeof coupon._id);
                     var index = coupon['couponUsed'];
                     let coord2 = {
                        latitude: Number(coupon.lat),//39.8894840,
                        longitude: Number(coupon.long)
                      };
                     console.log(coord2);
                     let vincentyDist = geo.vincentySync(coord1, coord2);
                     console.log(vincentyDist);
                     if(vincentyDist <=  coupon.radius)
                     {
                     Coupon.findByIdAndUpdate({ _id : coupon._id },{ couponUsed : index +1 })
                         .then((s)=>{
                            if( coupon['isActive'] === true && coupon.noOfCoupons > coupon.couponUsed)
                                 {
                                  res.json({ "code" : coupon['promoCodes'][index]['promoCode']});
                                    //if(vincentyDist <=  coupon.radius && coupon['promoCodes'][index]['promoCode'] === false)
                                    //   res.json( { couponCode : coupon['promoCodes'][index]['promoCode'] });
                                 }
                                else
                                {
                                    res.json({ err : 'The coupon has expired '});
                                }
                             }).catch((err)=> res.send(err))
                    }
                    else
                     {
                         res.json({ err : 'The coupon is not applicable for your location'})
                     }
                }).catch((err) => res.json({ err : 'Error finding the coupon for this code' + err}))
        }).catch((err) => res.json({ err : 'Invalid API key'}))

    });


apiRouter.post('/availPromo',passport.authenticate('headerapikey',{ session : false , failureRedirect : '/api/unauthorized'}),(req,res)=>{


    User.findOne({apikey : req.body.apikey })
    .then((user)=>{
      var coord1 = {
            latitude: Number(req.body.lat),//38.8977330,
            longitude: Number(req.body.long)//80.2571658
          };
    Merchant.findOne({ email : user.email })
    .then((individual)=>{
        Coupon.find({ merchantId :  individual._id})
            .then(async (coupon)=>{
                var flag = 0;
                coupon.forEach((promo)=>{

                    let code = String(promo.code);
                    console.log(String(req.body.couponCode).slice(0,6));
                    let index = Number(req.body.couponCode.slice(6));
                    //console.log(index);
                    if(code === String(req.body.couponCode).slice(0,6))
                    {
                        if(promo['promoCodes'][index]['used'] == false)
                        {
                            flag =1;
                            let coord2 = {
                                latitude: Number(promo.lat),//39.8894840,
                                longitude: Number(promo.long)
                              };
                              let vincentyDist = geo.vincentySync(coord1, coord2);
                              console.log(vincentyDist);
                              if(vincentyDist <=  promo.radius)
                              {
                                promo['promoCodes'][index]['used'] = true;
                                Coupon.findByIdAndUpdate({ _id : promo._id },{ promoCodes : promo['promoCodes'] })
                                    .then((v) =>{

                                             res.json({
                                                    amount : promo.amount,
                                                    type : promo.isPercent === true ? "Discount" : "Flat"
                                                });
                                                }
                                ).catch((err) => res.json({ err : 'Error finding the coupon code'}))
                              }
                              else
                              {
                                  res.json({ err : 'The usage of the coupon is not applicable for your location'})
                              }
                        }
                        else{
                            res.json({ err : 'The coupon has expired !'});
                        }

                    }
                 })
                 if(flag === 0)
                 {
                     res.send('Invalid coupon code');
                 }

            })
            .catch((err)=> res.json({ error : 'Error finding Merchant account for this api key ' + err}))

         })
        .catch((err)=> console.log(err))
        })
        .catch((err)=> res.json({ error : 'Invalid API key !'}))

        });


//  apiRouter.post("/payment/order",(req,res)=>{

//     let params = {
//         amount : req.body.amount,
//         currency: "INR",
//         receipt: "su001",
//         payment_capture: '1'
//       };
//     instance.orders.create(params).then((data) => {
//             res.send({"sub":data,"status":"success"});
//     }).catch((error) => {
//             res.send({"sub":error,"status":"failed"});
//     })
// });




apiRouter.post("/payment/verify",(req,res)=>{

body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

var crypto = require("crypto");
var expectedSignature = crypto.createHmac('sha256', key.RAZOR_SECRET)
                                            .update(body.toString())
                                            .digest('hex');
                                            console.log("sig"+req.body.razorpay_signature);
                                            console.log("sig"+expectedSignature);
var response = {"status":"failure"}
if(expectedSignature === req.body.razorpay_signature)
    response={"status":"success"}
    res.send(response);
});



apiRouter.get('/pay',(req,res)=>{

     res.render('payment.ejs');
});

apiRouter.get('/sendmail',(req,res)=>{

const msg = {
  to: 'antoprince001@gmail.com',
  from: 'contact@baeon.co',
  subject: 'BAEON coupon campaign',
  //text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>Awesome!<br>Your promotional campaign has been created successfully !</strong>',
};
sgMail.send(msg)
.then(() =>{ res.send('sucesss')})
.catch((err)=> { res.send(err)});
});


//
// apiRouter.post("/order", (req, res) => {
//     try {
//     console.log(req.body);
//     const options = {
//       amount: req.body.amount*100, // amount == Rs 10
//       currency: "INR",
//       receipt: "receipt#1",
//       payment_capture: 0,
//  // 1 for automatic capture // 0 for manual capture
//  };  instance.orders.create(options, async function (err, order) {
//       if (err) {
//       return res.status(500).json({
//         message: "Something Went Wrong",
//       });
//     }
//   return res.status(200).json(order);
//  });} catch (err) {
//    console.log(err);
//   return res.status(500).json({
//     message: "Something Went Wrong",
//   });
//  }
// });

apiRouter.post("/capture/:paymentId", (req, res) => {
    try {
      console.log('capture');
      console.log(req.body.amount);
 return request(
      {
    method: "POST",
    url: `https://${key.RAZOR_KEY}:${key.RAZOR_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
    form: {
       amount: req.body.amount * 100, // amount == Rs 10 // Same As Order amount
       currency: "INR",
     },
   },
   async function (err, response, body) {
    if (err) {
     return res.status(500).json({
        message: err
      });
    }
     console.log("Status:", response.statusCode);
     console.log("Headers:", JSON.stringify(response.headers));
     console.log("Response:", body);

     return res.status(200).json(body);
    });
} catch (err) {
   return res.status(500).json({
     message: err.message,
  });
}});




/* Product related API endpoints*/
// Add products
apiRouter.post('/product/add',passport.authenticate('headerapikey',{ session : false , failureRedirect : '/api/unauthorized'}),(req,res)=>{

    if(!Number(req.body.stock))
    {
        res.status(422).json({ msg : 'Stock should be a number or is missing'})
    }
    else if(!Number(req.body.unitPrice) || !Number(req.body.unitPrice) > 0)
    {
        res.status(422).json({ msg : 'Price should be a positive number or is missing'})

    }
    else if(!req.body.productName || req.body.productName === "")
    {
        res.status(422).json({ msg : 'Product name missing'})

    }
    else
    {
    Merchant.findOne({ email : req.user.email })
    .then((user)=>{


        const newProduct = new Product(
        {
                    "merchantId" : user._id,
                    "productName" : req.body.productName,
                    "productDesc" : req.body.productDesc || "",
                    "stock"    : Number(req.body.stock),
                    "unitPrice"     : Number(req.body.unitPrice),
        }
        );


            console.log(user);
            newProduct.save()
                .then((data)=> res.status(201).json({ msg : 'Product details added successfully', productId : data._id } ))
                .catch((err)=> res.status(422).json({ msg : 'There was an error in the product details'}))
    })
    .catch((err)=>{
        res.json({ msg : 'There was an error finding the merchant details for your api key !',})
    })
    }

});

// Get all products
apiRouter.get('/getproducts',passport.authenticate('headerapikey',{ session : false , failureRedirect : '/api/unauthorized'}),(req,res)=>{

    Merchant.findOne({ email : req.user.email })
    .then((user)=>{
      Product.find({ merchantId : user._id })
      .then((products)=>{
        res.json(products);
      })
      .catch((err)=>{
          res.status(422).json({ msg : 'There was an error finding products'})
      })
    })
    .catch((err)=>{
        res.status(422).json({ msg : 'There was an error finding the merchant details for your api key !',})
    })
});

//Delete product
apiRouter.delete('/product',passport.authenticate('headerapikey',{ session : false , failureRedirect : '/api/unauthorized'}),(req,res)=>{


   Product.findByIdAndRemove({ _id : req.query.product })
      .then((products)=>{
          if(products=== null)
          {
              res.status(204).send('Product does not exist !');
          }
          else
          {
             res.status(200).send('Product deleted');
          }
      })
      .catch((err)=>{
          res.json({ error : err.message})
      })
});

// Get product for id
apiRouter.get('/product',passport.authenticate('headerapikey',{ session : false , failureRedirect : '/api/unauthorized'}),(req,res)=>{

    Merchant.findOne({ email : req.user.email })
    .then((user)=>{

    if(req.query.productName)
    {
        Product.find({ productName : req.query.productName })
        .then((products)=>{
          res.json(products);
        })
        .catch((err)=>{
            res.status(422).json({ msg : 'There was an error finding products'})
        });
    }
    else if(req.query.id)
    {
      Product.findById({ _id : req.query.id })
      .then((products)=>{
        res.json(products);
      })
      .catch((err)=>{
          res.status(422).json({ msg : 'There was an error finding products'})
      })
    }
    else
    {
        if(req.query.id)
        {
            res.status(422).json({ msg : 'Product id missing in request'});
        }
        else
        {
          res.status(422).json({ msg : 'Product id missing in request'});
        }
    }
    })
    .catch((err)=>{
        res.status(422).json({ msg : 'There was an error finding the merchant details for your api key !',})
    })
});



// Product update
apiRouter.patch('/product',passport.authenticate('headerapikey',{ session : false , failureRedirect : '/api/unauthorized'}),(req,res)=>{

    Product.findById({ _id : req.query.productId })
    .then((pro)=>{

        if(pro === null )
        {
            res.status(422).json({ msg : 'Product could not be found'});
        }
        if(req.query.productName !== undefined && req.query.productName.length<1)
        {
            res.status(422).json({ msg : 'Product name is empty'});

        }
        if(req.query.stock !== undefined && !Number(req.query.stock))
        {
            res.status(422).json({ msg : 'Product stock value is not a number'});

        }
        if(req.query.unitPrice !== undefined && Number(req.query.unitPrice)<0)
        {
            res.status(422).json({ msg : 'Product price value is not a positive number'});

        }
    Product.findByIdAndUpdate({ _id : req.query.productId },
        { productName : req.query.productName === undefined?pro.productName :  req.query.productName,
          unitPrice   : req.query.unitPrice   === undefined?pro.unitPrice :  Number(req.query.unitPrice),
          stock   : req.query.stock   === undefined?pro.stock :  Number(req.query.stock) ,
          productDesc : req.query.productDesc === undefined?pro.productDesc :  req.query.productDesc,
     })
       .then((products)=>{
           if(products=== null)
           {
               res.status(204).send('Product does not exist !');
           }
           else
           {
              res.status(200).send('Product Updated');
           }
       })
       .catch((err)=>{
           res.json({ error : err.message})
       })
    })
    .catch((err) => res.json({ error : err.message}));
 });




 /* Coupon related API endpoints*/
 apiRouter.post("/order", passport.authenticate('jwt',{session : false}),(req, res) => {


  User.findOne({ email : req.user.email })
  .then((users)=>{

    Merchant.findOne({ email : users.email })
      .then(async (user)=>{

        console.log(req.body.amount);
        if(!req.body.coupon.couponTitle)
        {
          res.staus(500).json({  error : "Title for coupon field is missing "})
        }
        else if(!req.body.coupon.couponNumber)
        {
          res.json({  error : "Number of coupons field is missing "})
        }
        else if(!req.body.amount)
        {
          res.json({  error : "Amount field is missing "})
        }
        else if(!req.body.coupon.product)
        {
          res.json({ error : 'No product has been selected'})
        }
        else if(!req.body.merchant)
        {
          res.json({ error : 'No merchant has been selected'})
        }
        else
        {
          const promoCodes = [];
          const id = await Math.random().toString(36).substring(7).toUpperCase();
          console.log("random", id);
          for(let i = 0 ; i< Number(req.body.coupon.noOfCoupons);i++)
          {

            let code ={
              'promoCode' : String(id+i),
              'used'    : false
            };
            promoCodes.push(code);
          }
          console.log(req.body.All);
          const newPromotion = new Coupon({
            "merchantId" : user._id,
            // "productId"  : req.body.productId,
            "couponTitle" : req.body.coupon.couponTitle,
            "couponDescription" : req.body.coupon.couponDescription,
            "noOfCoupons": req.body.coupon.couponNumber,
            "isPercent"  : req.body.coupon.isPercent === "Discount" ? true :false,
            "amount"     : req.body.amount,
            //"expireDate" :  req.body.coupon.expireDate === undefined ? '' : req.body.expireDate,
            "radius"     : req.body.coupon.radius,
            "lat"        : user.lat,
            "long"       : user.long,
            //"couponImage"  :req.file == undefined ? '': req.file.path ,
            "isActive"   : true,
            "startDate"  : "YYYY-MM-DD",
            "promoCodes" : promoCodes,
            "couponUsed" : 0,
            "products"  : req.body.coupon.product,//Number(req.body.All) === 1? ["All"] : req.body.products,
            "merchants" : req.body.merchant,
            "businessName" : user.businessName,
            "code"         : id,
            "status"     : "PAYMENT_INITIATED"
          });

    newPromotion.save()
    .then((data)=>
    {
    try {
        console.log(req.body);
        const options = {
        amount: req.body.amount*100, // amount == Rs 10
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: 0,
        // 1 for automatic capture // 0 for manual capture
                        };
        instance.orders.create(options, async function (err, order) {
          if (err) {
              return res.status(500).json({
                  message: "Something Went Wrong",
                  });
          }
          console.log(order);
          return res.status(200).json(order);
        });
      }
      catch (err) {
        console.log(err);
        return res.status(500).json({
          message: "Something Went Wrong",
        });
}
 //res.status(201).json({ msg : 'Promotion details added successfully' } ))
 })
 .catch((err)=> res.status(500).json({ msg : 'There was an error in the promotion details'+err }))
 }})
 .catch((err)=> res.status(500).json({ error : err.message }));

 }).
 catch((err)=>  res.status(500).json({ error : err.message }));
});




module.exports = apiRouter;
