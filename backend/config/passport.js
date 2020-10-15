// Implementation of passport js strategies 

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const HeaderAPIKeyStrategy = require('passport-headerapikey').HeaderAPIKeyStrategy;
const User = require('../models/userSchema');

const strategy =  require('passport-facebook');
const FacebookStrategy = strategy.Strategy;
const { FACEBOOK_CLIENT_ID , FACEBOOK_CLIENT_SECRET } = require('./auth');

const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
        console.log(token);
    }
    return token;
}

// Authorization for requests
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "couponToken"
},(payload,done)=>{
    User.findById({_id : payload.sub},(err,user)=>{
      console.log(payload);
        if(err)
        {
           console.log(err)
            done(err,false);
            
        }
        if(user)
        {
              console.log(user)
              done(null,user);
        }
        else
        {
            done(null,false);
        }
    });
}));


// Authenticated local strategy using email and password
passport.use(new LocalStrategy((email,password,done)=>{
    User.findOne({email},(err,user)=>{
        // something went wrong with database
        if(err)
            return done(err,{ message : 'There was error connecting to the database !'});
        // if no user exist
        if(!user)
            return done(null,false,{ message : 'User does not exists !'});
        // check if password is correct
        user.comparePassword(password,done);        
    });
}));



// Facebook strategy 

// passport.use(
//     new FacebookStrategy(
//       {
//         clientID: FACEBOOK_CLIENT_ID,
//         clientSecret: FACEBOOK_CLIENT_SECRET,
//         callbackURL: 'http://localhost:5000/user/auth/facebook/callback' ,
//         profileFields: ["email", "name"]
//       },
//       function(accessToken, refreshToken, profile, done) {
//         const { email, first_name } = profile._json;
//         const userData = {
//           email,
//           username: first_name,
//           password : 'facebookTest',
//           mobileno : '1234567890'
//         };
//         new User(userData).save()
//         .then(()=>{
//             done(null, profile);
//         })
//         .catch(()=>{
//             done(null,false);
//         })
        
//       }
//     )
//   );

  passport.use( new HeaderAPIKeyStrategy(
    { header: 'x-api-key', prefix: '' },
    false,
    function(apikey, done) {
      User.findOne({ apikey: apikey }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
    }
  ));


  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });