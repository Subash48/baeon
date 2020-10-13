// REST API for website request handling

const express = require('express');
const cors = require('cors');
const { mongoURI } = require('./config/mongo');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport')
const helmet   = require('helmet');
const path = require('path');
app.use(cookieParser()); // To parse jwt
app.use(express.json()); // To read post requests
app.use(express.urlencoded({ extended: true }));
//app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       "default-src": ["'self'"],
//       "script-src": ["'self'", "example.com"],
//       "object-src": ["'none'"],
//     },
//   })
// );
//app.set('view engine','ejs');                   //Templating engine
//app.use(express.static('views'));
/* Routes handling */
const userRouter = require('./routes/users');
app.use('/user',userRouter);

const merchantRouter = require('./routes/merchants');
app.use('/merchant',merchantRouter);

const apiRouter = require('./routes/api');
app.use('/api',apiRouter);

//Update when moving to production
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});
// app.use('/', express.static('./frontend/build'));
//production modeif(process.env.NODE_ENV === 'production') {
 //app.use(express.static(path.join(__dirname, 'frontend/build')));
 //app.get('*', (req, res) => {    res.sendFile(path.join(__dirname+'/frontend/public/index.html'));  });
  //  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  })}

 /*app.use(cors({
    origin: [
     //  'http://3.23.97.19:3000',
	//  'https://fonts.googleapis.com/' ,
	//  'https://use.fontawesome.com'
    //   'http://localhost:3000',
     ],
    credentials: true
  }))         // To allow cross origin requests

*/
//app.options('*', cors()) // include before other routes
app.use(cors());

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


/* Server config */
module.exports = app.listen(5000,()=>{
    console.log('express server started');
});
