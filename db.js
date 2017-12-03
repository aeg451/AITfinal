
const mongoose = require('mongoose');
//URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
passportLocalMongoose = require('passport-local-mongoose');

// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 0 or more lists

const UserSchema = new Schema({
    // username, password provided by plugin
    //race: [RaceSchema],
    //log: [LogSchema],
    //race:  [{ type: String, ref: 'Race' }],
    //log:  [{ type: String, ref: "Log" }],
    username: String,
    password: String
});
 /*
const User = new Schema({ });
User.plugin(passportLocalMongoose);
*/
UserSchema.methods.isValidPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

UserSchema.methods.createHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const User = mongoose.model('User', UserSchema);
///////////////////////////////////////////////////////////
//Log
///////////////////////////////////////////////////////////
const LogSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref:'User'
  // },
  // //user: Schema.ObjectId,
  user: [{ type:  Schema.Types.ObjectId, ref: 'User' }],
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
const Log = mongoose.model('Log', LogSchema);
///////////////////////////////////////////////////////////
//Race
///////////////////////////////////////////////////////////
const RaceSchema = new mongoose.Schema({
  user: [{ type:  Schema.Types.ObjectId, ref: 'User' }],
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
const Race = mongoose.model('Race', RaceSchema);
///////////////////////////////////////////////////////////
//FOOD
///////////////////////////////////////////////////////////
const FoodSchema = new mongoose.Schema({
  user: [{ type:  Schema.Types.ObjectId, ref: 'User' }],
  date: {
    type: String, 
    required: true
  },
  breakfast: {
    type: String, 
    required: true
  },
  lunch: {
    type: String, 
    required: true
  },
  dinner: {
    type: String, 
    required: true
  },
  snack: {
    type: String, 
    required: true
  },
  other: {
    type: String, 
    required: true
  },
  exercise: {
    type: String, 
    required: true
  }
}, {
  _id: true
});
const Food = mongoose.model('Food', FoodSchema);

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
mongoose.connect(dbconf);


//local testing
//mongoose.connect('mongodb://localhost/project');