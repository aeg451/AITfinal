const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./db');
const mongoose = require('mongoose');
const Log = mongoose.model('Log');
const path = require('path');
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(publicPath));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req, res) => {
	Log.find({}, (err, log) => {
		if(err){
			console.log(err);
		}
		res.render('index', {log: log});	
	});
});

app.get('/create', (req, res) => {
	res.render('create');
});

app.post('/create', function(req, res) {
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
      res.redirect('/');
    }
  });
});

app.get('/:slug', function(req, res){
  Log.findOne({slug: req.params.slug}, function(err, log){
		if(err){
			console.log(err);
		}
		res.render('index', {log: log});
	});
});

app.get('/css/base.css', (req, res) => {
	res.render('base.css');
});

app.listen(process.env.PORT || 3000);