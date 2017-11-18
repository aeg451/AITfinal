const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

require('./db');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Log = mongoose.model('Log');
const Race = mongoose.model('Race');
app.use(bodyParser.urlencoded({extended:false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const sessionOptions = {
	secret: 'secret kitchen thang',
	resave: true,
	saveUninitialized: true
};
app.use(session(sessionOptions));
///////////////////////////////////////////////////////////
//INDEX
///////////////////////////////////////////////////////////
app.get('/', (req, res) => {
	res.render('index');
});
///////////////////////////////////////////////////////////
//CREATELOG
///////////////////////////////////////////////////////////
app.get('/createLog', (req, res) => {
	res.render('createLog');
});

app.post('/createLog', function(req, res) {
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
//CREATERACE
///////////////////////////////////////////////////////////
app.get('/createRace', (req, res) => {
	res.render('createRace');
});

app.post('/createRace', function(req, res) {
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
//RUNNING LOG
///////////////////////////////////////////////////////////
app.get('/log', (req, res) => {
	Log.find({}, (err, log) => {
		if(err){
			console.log(err);
		}
		res.render('log', {log: log});	
	});
});

app.post('/log', function(req, res) {
	if(req.body.delete){
		Log.findByIdAndRemove(req.body.id, (err) => {  
			if(err){
						console.log(err);
					}
	  	});		
	}
	res.redirect('/log');	
});

///////////////////////////////////////////////////////////
//RACING LOG
///////////////////////////////////////////////////////////
app.get('/race', (req, res) => {
	Race.find({}, (err, race) => {
		if(err){
			console.log(err);
		}
		res.render('race', {race: race});	
	});
});

app.post('/race', function(req, res) {
	if(req.body.delete){
		Race.findByIdAndRemove(req.body.id, (err) => {  
			if(err){
						console.log(err);
					}
	  	});		
	}
	res.redirect('/race');	
});
///////////////////////////////////////////////////////////
//SLUGS
///////////////////////////////////////////////////////////
// app.get('/log/:slug', function(req, res){
//   Log.findOne({slug: req.params.slug}, function(err, log){
// 		if(err){
// 			console.log(err);
// 		}
// 		res.render('log', {log: log});
// 	});
// });

// app.get('/race/:slug', function(req, res){
//   Race.findOne({slug: req.params.slug}, function(err, race){
// 		if(err){
// 			console.log(err);
// 		}
// 		res.render('race', {race: race});
// 	});
// });
///////////////////////////////////////////////////////////
//CSS
///////////////////////////////////////////////////////////
app.get('/css/base.css', (req, res) => {
	res.render('base.css');
});

app.listen(process.env.PORT || 3000);