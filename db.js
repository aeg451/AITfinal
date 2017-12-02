const mongoose = require('mongoose');
//URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
passportLocalMongoose = require('passport-local-mongoose');
///////////////////////////////////////////////////////////
//USER
///////////////////////////////////////////////////////////
const User = new Schema({
    race:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }],
    log:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Race' }],
    username: String,
    password: String
});
///////////////////////////////////////////////////////////
//LOG
///////////////////////////////////////////////////////////
const Log = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  date: {
    type: String, 
    required: true
  },
  type: {
    type: String, 
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  pace: {
    type: String, 
    required: true
  },
  goals: {
    type: String, 
    required: true
  },
  comments: {
    type: String, 
    required: true
  },
  location: {
    type: String, 
    required: true
  }
}, {
  _id: true
});
///////////////////////////////////////////////////////////
//RACE
///////////////////////////////////////////////////////////
const Race = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  date: {
    type: String, 
    required: true
  },
  distance: {
    type: String, 
    required: true
  },
  time: {
    type: String, 
    required: true
  },
  comments: {
    type: String, 
    required: true
  },
  location: {
    type: String, 
    required: true
  }
}, {
  _id: true
});
//RaceSchema.plugin(URLSlugs('date race'));
///////////////////////////////////////////////////////////
//BCRYPT
///////////////////////////////////////////////////////////
User.methods.isValidPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
User.methods.createHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
///////////////////////////////////////////////////////////
//MODELS
///////////////////////////////////////////////////////////
mongoose.model('Log', Log);
mongoose.model('Race', Race);
mongoose.model('User', User);
///////////////////////////////////////////////////////////
//CONNECTING
///////////////////////////////////////////////////////////
// is the environment constiable, NODE_ENV, set to PRODUCTION?
if (process.env.NODE_ENV == 'PRODUCTION') {
    // if we're in PRODUCTION mode, then read the configration from a file
    // use blocking file io to do this...
    const fs = require('fs');
    const path = require('path');
    const fn = path.join(__dirname, 'config.json');
    const data = fs.readFileSync(fn);

    // our configuration file will be in json, so parse it and set the
    // connection string appropriately!
    const conf = JSON.parse(data);
    var dbconf = conf.dbconf;
} else {
    // if we're not in PRODUCTION mode, then use
    dbconf = 'mongodb://localhost/project';
}
mongoose.connect(dbconf ,{ useMongoClient: true});