const express = require('express');
const app = express();
//const [PORT, HOST] = [3000, '127.0.0.1'];
const PORT = 3000;
const bodyParser = require('body-parser');
const session = require('express-session');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

require('./db');
const mongoose = require('mongoose');
const User = mongoose.model('User');

app.use(bodyParser.urlencoded({extended:false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const sessionOptions = {
	secret: 'secret kitchen thang',
	resave: true,
	saveUninitialized: true
};

app.use(session(sessionOptions));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/css/base.css', (req, res) => {
	res.render('base.css');
});

app.listen(process.env.PORT || PORT);