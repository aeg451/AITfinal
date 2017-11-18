const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
//const passportLocalMongoose = require('passport-local-mongoose');
///////////////////////////////////////////////////////////
//User
///////////////////////////////////////////////////////////
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
// var User = new mongoose.Schema({ });
// User.plugin(passportLocalMongoose);
///////////////////////////////////////////////////////////
//Log
///////////////////////////////////////////////////////////
const Log = new mongoose.Schema({
  date: {type: String, required: true},
  type: {type: String, required: true},
  description: {type: String, required: true},
  pace: {type: String, required: true},
  goals: {type: String, required: true},
  comments: {type: String, required: true},
  location: {type: String, required: true}
}, {
  _id: true
});
Log.plugin(URLSlugs('date type description pace'));
///////////////////////////////////////////////////////////
//Race
///////////////////////////////////////////////////////////
const Race = new mongoose.Schema({
  date: {type: String, required: true},
  distance: {type: String, required: true},
  time: {type: String, required: true},
  comments: {type: String, required: true},
  location: {type: String, required: true}
}, {
  _id: true
});
Race.plugin(URLSlugs('date race time location'));
///////////////////////////////////////////////////////////
//List
///////////////////////////////////////////////////////////
const List = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  log: [Log],
  race: [Race]
});
///////////////////////////////////////////////////////////
//Models
///////////////////////////////////////////////////////////
mongoose.model("User", User);
mongoose.model("List", List);
mongoose.model("Log", Log);
mongoose.model("Race", Race);
///////////////////////////////////////////////////////////
//Config
///////////////////////////////////////////////////////////
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
 dbconf = "mongodb://localhost/aeg451FP";
}
// model / constructor is being registered
// using some schema

mongoose.connect(dbconf);