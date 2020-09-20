// REST API for website request handling

const express = require('express');
const cors = require('cors');
const { mongoURI } = require('./config/mongo');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport')
const helmet   = require('helmet');

app.use(cookieParser()); // To parse jwt
app.use(express.json()); // To read post requests
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.set('view engine','ejs');                   //Templating engine
app.use(express.static('views'));

//Update when moving to production
app.use(cors({
    origin: [
      'http://3.23.97.19:3000'
    //   'http://localhost:3000',
     ],
    credentials: true
  }))         // To allow cross origin requests


app.use(passport.initialize());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();

// });


app.use('/uploads',express.static('uploads'));

/* Mongodb Configuration */
mongoose.connect(mongoURI,{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});

/* Routes handling */
const userRouter = require('./routes/users');
app.use('/user',userRouter);

const merchantRouter = require('./routes/merchants');
app.use('/merchant',merchantRouter);

const apiRouter = require('./routes/api');
app.use('/api',apiRouter);

/* Server config */
module.exports = app.listen(5000,()=>{
    console.log('express server started');
});
