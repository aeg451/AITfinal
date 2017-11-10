const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const [PORT, HOST] = [3000, '127.0.0.1'];
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

require('./db');
const mongoose = require('mongoose');
//const User = mongoose.model('User');
//const List = mongoose.model('List');
const Log = mongoose.model('Log');

app.use(bodyParser.urlencoded({extended:false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
	Log.find({}, (err, log) => {
		if(err){
			console.log(err);
		}
		res.render('index', {log: log});	
	});
});

// app.post('/', (req, res) => {
// 	const newLog = new Log({
// 		type: req.body.type,
// 		description: req.body.description,
// 		pace: req.body.pace,
// 		goals: req.body.goals,
// 		comments: req.body.comments,
// 		location: req.body.location,
// 		date: req.body.date
// }, {
//   _id: true
// });
// 	newLog.save((err) => {
// 		if(err){
// 			console.log(err);
// 		}
// 		res.redirect('/');
// 	});
// });


//db.Person.remove({'last':'bob'})
//db.Person.update({'first':'foo'}, {$set: {'last':'bar'}})


// app.post('/', (req, res) => {
// if(req.body.delete == true){
// Log.findByIdAndRemove(Log._id, function(err1, doc1) { // doc here is actually err
//         // handle err1
//         console.log('findByIdAndRemove doc: ', doc1);
//         Log.find({}, function(err2, docs) {
//           console.log('Finding all: ', docs)
//         })
//       })
// }
// res.redirect('/');
// });

// app.get('/index/:slug', (req, res) => {
// 	Log.find({slug: req.params.slug}, (err, log) => {
// 		if(err){
// 			console.log(err);
// 		}
// 		res.render('index', {log: log});
// 	});
// });

app.get('/css/base.css', (req, res) => {
	res.render('base.css');
});

app.listen(process.env.PORT || 3000);

