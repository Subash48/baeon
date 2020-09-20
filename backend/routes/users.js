const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('../models/userSchema');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

// Password verification signature - JWT Token
const signToken = userID =>{
    return JWT.sign({
        iss : "couponToken", //To be changed
        sub : userID
    },"couponToken",{expiresIn : "1800s"});
}



// @route       :  'user/register'
// @description :   Common user registration
// @method      :   Post
// @params      :   username, email , mobileno , password

userRouter.post('/register',async (req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password,10);

    crypto.randomBytes(10,(err,buffer)=>{
            if(err){
                //console.log(err)
                res.status(500).json({ error : err });
            }
        const token = buffer.toString("hex")

        const newUser = new User({
            username : req.body.username,
            email    : req.body.email,
            mobileno : req.body.mobileno,
            password : hashedPassword,
            role     : "user",
            emailVerified : false,
            phoneVerified : false,
            resetPasswordToken : token,
            resetPasswordExpires : Date.now() + 3600000,
            creationTime : new Date(),
            loginTime    : new Date()

        });
        newUser.save().then((result)=>{

            const msg = {
                to: req.body.email,
                from: 'contact@baeon.co',
                subject: 'BAEON Account Creation',
                text: 'Congratulations !' +'\n\n'+ 'You have successfully created an account at baeon\n'+
                      'Please click on the following link, or paste this into your browser to complete your email verification:\n\n' +
                      'http://localhost:3000/verify/' + result.resetPasswordToken + '\n\n' +
                      'We are excited to have you onboard with us.\n'                  };
                sgMail.send(msg)
                    .then(() =>{

                        res.status(201).json({ msg : 'User added successfully' } );
                               })
                    .catch((err)=>{
                        res.status(400).json({error : 'There was an error sending the email !'})
                              })


                })
            .catch(() => {
            res.status(422).json({ error : 'There was an error creating your account'})
                })
            })
    });


// @route       :  'user/login'
// @description :   Login with passport local strategy( refer config/passport.js )
// @method      :   Post
// @params      :   username : email , password : password
// @note        :   Email id is considered as username for the login entry

userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
       const { _id,email,role,emailVerified } = req.user;
       const user = req.user;
       console.log(emailVerified);
       if(emailVerified === false)
       {

         crypto.randomBytes(10,(err,buffer)=>{
                 if(err){
                     //console.log(err)
                     res.status(500).json({ error : err });
                 }
         const token = buffer.toString("hex")
         const msg = {
             to:  email,
             from: 'contact@baeon.co',
             subject: 'BAEON Account Creation',
             text: 'Congratulations !' +'\n\n'+ 'You have successfully created an account at baeon\n'+
                   'Please click on the following link, or paste this into your browser to complete your email verification:\n\n' +
                   'http://localhost:3000/verify/' + token + '\n\n' +
                   'We are excited to have you onboard with us.\n'
                             };

          User.findOne({ email : req.user.email })
          .then((user) =>{
           user.resetPasswordToken = token;
           user.resetPasswordExpires = Date.now() + 3600000;
           user.save().then((saveduser)=>{

             sgMail.send(msg)
                 .then(() =>{
                     let role = "unverified";
                     res.status(201).json({ isAuthenticated : true , user : { email ,role} } );
                            })
                 .catch((err)=>{
                     res.status(400).json({error : 'There was an error sending the email associated with your account!' + err})
                           })

             }).catch((err) => {
             console.log(err);
             res.status(422).json({ error : 'Unable to login'});
           }).catch((err) => {
           console.log(err);
           res.status(422).json({ error : 'Unable to login'});

           })
         }).catch((err) => {
         console.log(err);
         res.status(422).json({ error : 'Unable to login'});

         })
       })

     }
       else {

       const token = signToken(_id);
       res.cookie('access_token',token,{httpOnly: true, sameSite:true});
       //res.cookie('access_token', token, { maxAge: 900000, httpOnly: true });
       //res.cookie('access_token',token,{httpOnly: true, SameSite:true });//,expire: 360000 + Date.now() });
       res.status(200).json({isAuthenticated : true,user : { email,role }});
     }
    }
    else
    {
        res.status(422).json({ error : 'Unable to login'});

    }

});


// @route       :  'user/verify:token'
// @description :   Verify email for account
// @method      :   GET
// @params      :   token

userRouter.get('/verify/:token', function(req, res) {

  const sentToken = req.params.token;

  User.findOne({resetPasswordToken:sentToken,resetPasswordExpires:{$gt:Date.now()}})
    .then(user=>{
        console.log(user);
        if(user === null){
            return res.status(422).json({error:'User for this token not found', code : false})
        }
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.emailVerified = true;
        // User.findByIdAndUpdate({ _id : user._id } , { emailVerified : true , resetPasswordToken : undefined , resetPasswordExpires : undefined})
        user.save().then((saveduser)=>{
          return res.status(200).json({ message : 'Email verified successfully' , code : true})
      })
      }).catch(err=>{
        console.log(err);
        return res.status(422).json({error:'Error occured ! Could not verify email' , code : false})

    })
  });



// @route       :  'user/forgot'
// @description :   Generates token for password reset and sends token link via email
// @method      :   Post
// @params      :   email
// @note        :   The mail is sent via the emailid in line 25 of this file
                    /* In case of changing sender email, in the gmail account settings
                    allow permission for access to less secure apps )
                    https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7  */

userRouter.post('/forgot', function(req, res, next) {

    crypto.randomBytes(20,(err,buffer)=>{
        if(err){
            //console.log(err)
            res.status(500).json({ error : err });
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetPasswordToken = token
            user.resetPasswordExpires = Date.now() + 3600000
            user.save().then((result)=>{
                const msg = {
                    to: req.body.email,
                    from: 'contact@baeon.co',
                    subject: 'BAEON coupon campaign',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://localhost:3000/reset:' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'                  };
                  sgMail.send(msg)
                  .then(() =>{

                      res.json({message: "An email with link to reset password has been sent !"})
                  })
                  .catch((err)=>{
                      res.status(400).json({error : 'There was an error sending the email !'})
                  })
        })

        })
    })
  });


// @route       :  'user/reset:token'
// @description :   Updates old password with new
// @method      :   Post
// @params      :   password , token

userRouter.post('/reset/:token', function(req, res) {

  const newPassword = req.body.password
  const sentToken = req.params.token
  User.findOne({resetPasswordToken:sentToken,resetPasswordExpires:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:'Password reset token is invalid or has expired.'})
        }
        bcrypt.hash(newPassword,10).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetPasswordToken = undefined
           user.resetPasswordExpires = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        return res.status(422).json({error:'Error occured ! Could not change password'})

    })
  });



// @route       :  'user/logout'
// @description :   Logs out by deleting the access token stored in client side
// @method      :   GET

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');

    res.status(200).json({isAuthenticated : true,user : { email : "",role : "loggedout" }});
});


// Refer this code to set ROLES for users

// userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
//     if(req.user.role === 'admin'){
//         res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
//     }
//     else
//         res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
// });


// @route       :  'user/authenticated'
// @description :   To check if the user is still logged in or not
// @method      :   GET
// @params      :   JWT token

userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const { email ,role } = req.user;
    console.log(req.user);
    res.status(200).json({isAuthenticated : true, user : { email,role }});
});



// userRouter.get("/auth/facebook", passport.authenticate("facebook"));

// userRouter.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/user/fb/success",
//     failureRedirect: "/user/fb/fail"
//   })
// );

// userRouter.get("/fb/fail", (req, res) => {
//   res.status(400).json({ error : "Failed to connect to your Facebook account"})
// });

// userRouter.get("/fb/success", (req, res) => {
//   res.status(200).json({ message : 'Successfully connected to your Facebook account'});
// });

module.exports = userRouter;
