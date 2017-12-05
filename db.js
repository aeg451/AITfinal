const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
passportLocalMongoose = require('passport-local-mongoose');
///////////////////////////////////////////////////////////
//USER
///////////////////////////////////////////////////////////
const UserSchema = new Schema({
    username: String,
    password: String
});
///////////////////////////////////////////////////////////
//BCRYPT
///////////////////////////////////////////////////////////
UserSchema.methods.isValidPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
UserSchema.methods.createHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
///////////////////////////////////////////////////////////
//LOG 
///////////////////////////////////////////////////////////
const LogSchema = new mongoose.Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  date: {
    type: String, 
    required: true
  },
  type: {
    type: String, 
    required: true
  },
  distance: {
    type: String, 
    required: true
  },
  pace: {
    type: String, 
    required: true
  },
  splits: {
    type: String, 
  },
  notes: {
    type: String, 
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
const RaceSchema = new mongoose.Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  date: {
    type: String, 
    required: true
  },
  events: {
    type: String, 
    required: true
  },
  time: {
    type: String, 
    required: true
  },
  pace: {
    type: String, 
  },
  notes: {
    type: String, 
  },
  meet: {
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
  },
  lunch: {
    type: String, 
  },
  dinner: {
    type: String, 
  },
  snack: {
    type: String, 
  },
  other: {
    type: String, 
  },
  exercise: {
    type: String, 
    required: true
  }
}, {
  _id: true
});
///////////////////////////////////////////////////////////
//MODELS
///////////////////////////////////////////////////////////
const User = mongoose.model('User', UserSchema);
const Log = mongoose.model('Log', LogSchema);
const Race = mongoose.model('Race', RaceSchema);
const Food = mongoose.model('Food', FoodSchema);
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

