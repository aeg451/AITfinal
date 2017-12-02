const express = require('express');
require('./db');
const mongoose = require('mongoose');
const Log = mongoose.model('Log');
const Race = mongoose.model('Race');
const User = mongoose.model('User');
const app = express();

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const path = require('path');
const publicPath = path.resolve(__dirname,'public');
app.use(express.static('public'));

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require("connect-flash");
const expressSession = require('express-session');
app.use(expressSession({secret: 'mySecret', resave:'false', saveUninitialized:'false'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'hbs');
///////////////////////////////////////////////////////////
//PASSPORT
///////////////////////////////////////////////////////////
passport.serializeUser(function(user,done){
    done(null,user._id);
});
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err,user);
    });
});
passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
},
    function(req, username, password, done){
        User.findOne({'username':username}, function (err,user) {
            if(err) return done(err);
            if(!user){
                console.log('Please enter a valid username instead of '+username );
                return done(null,false, req.flash('message','No user found.'));
            }
            if(!user.isValidPassword(password)) {
                console.log('Invlaid password!');
                return done(null, false, req.flash('message', 'Invalid password.'));
            }
            return done(null,user);
            }
        );
}));
passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done){
            process.nextTick(function(){
            User.findOne({'username': username}, function (err, user) {
                    if (err) {console.log('SignUp Error: '+err); return done(err);}
                    if (user) {
                        console.log('User already exists');
                        return done(null, false, req.flash('message',"User already exists."));
                    } else {

                        const newUser = new User()
                        newUser.username = username;
                        newUser.password = newUser.createHash(password);
                        newUser.save(function(err){
                            if(err) {console.log('Error: '+err); throw err;}
                            console.log("SignUp Succeeded");
                            return done(null,newUser);
                        });
                    }
                });
            });
        }
));
///////////////////////////////////////////////////////////
//LOGIN
///////////////////////////////////////////////////////////
app.get('/login', function(req,res){
    res.render('login', {'user':req.user});
});
app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash : true
    })
);
///////////////////////////////////////////////////////////
//SIGNUP
///////////////////////////////////////////////////////////
app.get('/signup', function(req,res){
    res.render('signup');
});
app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/login',
        failureRedirect: '/signup',
        failureFlash : true
    })
);
///////////////////////////////////////////////////////////
//LOGOUT
///////////////////////////////////////////////////////////
app.get('/logout', function(req, res){
    const name = req.user.username;
    console.log("LOGGIN OUT " + req.user.username)
    req.logout();
    res.redirect('/');
    req.session.notice = "You have successfully been logged out " + name + "!";
});
///////////////////////////////////////////////////////////
//INDEX
///////////////////////////////////////////////////////////
app.get('/', ensureAuthenticated, function (req, res) {
    res.render('index');
});
///////////////////////////////////////////////////////////
//VALIDATE AUTHENTICATION
///////////////////////////////////////////////////////////
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }
}
///////////////////////////////////////////////////////////
//LOG
///////////////////////////////////////////////////////////
app.get('/log',ensureAuthenticated,function (req,res) {
    if(req.user) {
        Log.find(function (err, log, count) {
            res.render('log', {'log': log});
        });
    }
    else
        console.log("please login :)");
});
app.post('/log',function(req, res) {
    if(req.body.delete){
        if(req.body.delete){
        Log.findByIdAndRemove(req.body.id, (err) => {  
            if(err){
                        console.log(err);
                    }
        });     
    }
    res.redirect('/log');   
    }
});
///////////////////////////////////////////////////////////
//CREATELOG
///////////////////////////////////////////////////////////
app.get('/createLog', ensureAuthenticated, function (req, res) {
    res.render('createLog');
});
app.post('/createLog', function (req, res) {
const newLog = new Log({
        type: req.body.type,
        description: req.body.description,
        pace: req.body.pace,
        goals: req.body.goals,
        comments: req.body.comments,
        location: req.body.location,
        date: req.body.date
});
  newLog.save(function(err) {
    if(err) {
      console.log(err);
    }
    else {
      res.redirect('/log');
    }
  });
});
///////////////////////////////////////////////////////////
//RACE
///////////////////////////////////////////////////////////
app.get('/race',ensureAuthenticated,function (req, res) {
    if(req.user) {
        Race.find(function (err, race, count) {
            res.render('race', {'race': race});
        });
    }
    else
        console.log("please login :)");
});
app.post('/race',function(req, res) {
    if(req.body.delete){
        if(req.body.delete){
        Race.findByIdAndRemove(req.body.id, (err) => {  
            if(err){
                        console.log(err);
                    }
        });     
    }
    res.redirect('/race');   
    }
});
///////////////////////////////////////////////////////////
//CREATERACE
///////////////////////////////////////////////////////////
app.get('/createRace', ensureAuthenticated, function (req, res) {
    res.render('createRace');
});
app.post('/createRace',ensureAuthenticated, function (req, res) {
const newRace = new Race({
        distance: req.body.distance,
        time: req.body.time,
        comments: req.body.comments,
        location: req.body.location,
        date: req.body.date
});
  newRace.save(function(err) {
    if(err) {
      console.log(err);
    }
    else {
      res.redirect('/race');
    }
  });
});
///////////////////////////////////////////////////////////
//LISTEN
///////////////////////////////////////////////////////////
app.listen(process.env.PORT||3000);