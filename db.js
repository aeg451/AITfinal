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
//LOG Log: -distance ,type:crosstraining splits

//Race: pace meet. distance/event
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
// var mongoose = require('mongoose');
// URLSlugs = require('mongoose-url-slugs');
// var Schema = mongoose.Schema;
// var bcrypt = require('bcryptjs');

// passportLocalMongoose = require('passport-local-mongoose');

// // users
// // * our site requires authentication...
// // * so users have a username and password
// // * they also can have 0 or more lists


// var User = new Schema({
//     // username, password provided by plugin
//     lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tab' }],
//     username: String,
//     password: String
// });
//  /*
// var User = new Schema({ });
// User.plugin(passportLocalMongoose);
// */

// // a page (or group of the same ideas under a topic) in a section
// // * includes a name, a quantity of number of times loved, and an optional description/feeling/details that can be edited
// var Page = new Schema({
//     name: {type: String, required: true},
//     numsLiked: {type: Number, default:0, required: false},
//     //numsLiked: {type: Number, min: 1, required: false},
//     description:{type: String, required: false}
// }, {
//     _id: true
// });

// // a tab of ideas/'dreams'
// // * each tab must have a related user
// // * a tab can include 0 or more pages
// var Tab = new Schema({
//     user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
//     name: {type: String, required: true},
//     totalLikes: {type: Number, default:0},
//     createdAt: {type: Date, default: Date.now},
//     pages: [Page]
// }, {
//     _id: true
// });

// Tab.plugin(URLSlugs('name',{index_unique:true}));



// User.methods.isValidPassword = function(password){
//     return bcrypt.compareSync(password,this.password);
// }

// User.methods.createHash = function(password){
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// }




// mongoose.model('Tab', Tab);
// mongoose.model('Page', Page);
// mongoose.model('User', User);


// // is the environment variable, NODE_ENV, set to PRODUCTION?
// if (process.env.NODE_ENV == 'PRODUCTION') {
//     // if we're in PRODUCTION mode, then read the configration from a file
//     // use blocking file io to do this...
//     var fs = require('fs');
//     var path = require('path');
//     var fn = path.join(__dirname, 'config.json');
//     var data = fs.readFileSync(fn);

//     // our configuration file will be in json, so parse it and set the
//     // connection string appropriately!
//     var conf = JSON.parse(data);
//     var dbconf = conf.dbconf;
// } else {
//     // if we're not in PRODUCTION mode, then use
//     dbconf = 'mongodb://localhost/project';
// }


// mongoose.connect(dbconf);


// //local testing
// //mongoose.connect('mongodb://localhost/project');
