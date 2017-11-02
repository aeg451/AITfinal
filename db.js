// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');
// YOU DO NOT HAVE TO EXPLICITLY DEFINE SLUG IN YOUR SCHEMA
// plugin takes care of it for you
const urlSlugs = require('mongoose-url-slugs');


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
mongoose.model("User", user);
mongoose.model("List", list);
mongoose.model("Log", log);

// hostname, db name
// alternative ways to connect, which callback, since connect async
mongoose.connect('mongodb://localhost/aeg451FP', {useMongoClient: true});
