const express = require('express');
const router = express.Router();
const Log = require('../models/db');
const Race = require('../models/db');
///////////////////////////////////////////////////////////
//INDEX
///////////////////////////////////////////////////////////
router.get('/', ensureAuthenticated, function (req, res) {
	res.render('index');
});
///////////////////////////////////////////////////////////
//Make sure user is Logged in before using other pages
///////////////////////////////////////////////////////////
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/users/login');
    }
}
///////////////////////////////////////////////////////////
//CREATELOG
///////////////////////////////////////////////////////////
router.get('/createLog', ensureAuthenticated, function (req, res) {
	res.render('createLog');
});
router.post('/createLog', ensureAuthenticated, function (req, res) {
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
router.get('/createRace', ensureAuthenticated, function (req, res) {
	res.render('createRace');
});
router.post('/createRace',ensureAuthenticated, function (req, res) {
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
router.get('/log', ensureAuthenticated, function (req, res) {
	Log.find({}, (err, log) => {
		if(err){
			console.log(err);
		}
		res.render('log', {log: log});	
	});
});
router.post('/log', ensureAuthenticated, function (req, res) {
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
router.get('/race', ensureAuthenticated, function (req, res) {
	Race.find({}, (err, race) => {
		if(err){
			console.log(err);
		}
		res.render('race', {race: race});	
	});
});
router.post('/race', ensureAuthenticated, function (req, res) {
	if(req.body.delete){
		Race.findByIdAndRemove(req.body.id, (err) => {  
			if(err){
						console.log(err);
					}
	  	});		
	}
	res.redirect('/race');	
});

module.exports = router;