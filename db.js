// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');
// YOU DO NOT HAVE TO EXPLICITLY DEFINE SLUG IN YOUR SCHEMA
// plugin takes care of it for you
const URLSlugs = require('mongoose-url-slugs');


// users
// * our site requires authentication...
// * so users have a username and password
const User = new mongoose.Schema({
  // username provided by authentication plugin
  // password hash provided by authentication plugin
  email: {type: String, unique: true, required: true},
  Fullname: {type: String},
  username: {type: String, unique: true},
  password: {type: String},
  lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});
User.plugin(URLSlugs('username'));

// a Log
//includes date, type, description, pace, goals, comments, and location
//logs can be edited or deleted
const Log = new mongoose.Schema({
  editDelete: {type: Boolean, default: false, required: true},
  date: {type: Date, required: true},
  type: {type: Boolean, default: false, required: true},
  description: {type: String, required: true},
  pace: {type: String, required: true},
  goals: {type: String, required: true},
  comments: {type: String, required: true},
  location: {type: String, required: true}
}, {
  _id: true
});

// a Log list
const List = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  log: [Log]
});


// model / constructor is being registered
// using some schema
mongoose.model("User", User);
mongoose.model("List", List);
mongoose.model("Log", Log);

// hostname, db name
// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 let dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/aeg451';
}

mongoose.connect(dbconf);
