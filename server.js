'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
//const cors = require('cors');
//const morgan = require('morgan');

require('dotenv').config();

// Database connection
// For local dev
// var dev_db_url = 'mongodb://localhost:27017/micro-blog'
var dev_db_url = 'mongodb://mongo:27017/micro-blog'
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
      
// Application setup
const app = express();
//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var port = 3000;

// Cors config
/* app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET','POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  credentials: true 
}
));
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
}); */

// Required for passport
const passportConf = require('./config/passport')(passport);
app.use(session({
  // If the app were to be deployed to serious use, the secret should be replaced by a secure one via environment variable for example
  secret: 'sshhhitsreallyasecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passportConf.initialize());
app.use(passportConf.session());

// Define routes
var router = express.Router();
const users = require('./routes/users')(router, passportConf);
const posts = require('./routes/posts')(router, passportConf);
app.use('/users', users);
app.use('/posts', posts);

app.listen(port, function(){
  console.log('Server running at port ', port);
});