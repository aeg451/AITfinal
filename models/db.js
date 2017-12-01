const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

///////////////////////////////////////////////////////////
//User
///////////////////////////////////////////////////////////
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        index: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});
///////////////////////////////////////////////////////////
//Log
///////////////////////////////////////////////////////////
const LogSchema = new mongoose.Schema({
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
//Log.plugin(URLSlugs('date type'));
///////////////////////////////////////////////////////////
//Race
///////////////////////////////////////////////////////////
const RaceSchema = new mongoose.Schema({
  date: {type: String, required: true},
  distance: {type: String, required: true},
  time: {type: String, required: true},
  comments: {type: String, required: true},
  location: {type: String, required: true}
}, {
  _id: true
});
//Race.plugin(URLSlugs('date race'));
///////////////////////////////////////////////////////////
//List
///////////////////////////////////////////////////////////
const ListSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  log: {type: [LogSchema], required: true},
  race: {type: [RaceSchema], required: true}
});
///////////////////////////////////////////////////////////
//Models
///////////////////////////////////////////////////////////
const List = module.exports = mongoose.model("List", ListSchema);
const Log = module.exports = mongoose.model("Log", LogSchema);
const Race = module.exports = mongoose.model("Race", RaceSchema);
const User = module.exports = mongoose.model('User', UserSchema);
///////////////////////////////////////////////////////////
//User methods
///////////////////////////////////////////////////////////
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
};
///////////////////////////////////////////////////////////
//Config
///////////////////////////////////////////////////////////
// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV === 'PRODUCTION') {
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 var dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = "mongodb://localhost/aeg451FP";
}
// model / constructor is being registered
// using some schema

mongoose.connect(dbconf);