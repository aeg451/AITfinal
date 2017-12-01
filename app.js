const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectFlash = require('connect-flash');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/passport', { useMongoClient: true});

//Init app
const app = express();
//require('./models/db');
//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//Set statuc folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(expressSession({
    secret: 'secret',
    saveUninitialized: true,
    resave:true
}));

//Passport Init
app.use(passport.initialize());
app.use(passport.session());

//Express validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        const namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;
        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//Connect flash
app.use(connectFlash());

//Global consts
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.host = 'http://localhost:'+app.get('port');
    next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.listen(process.env.PORT || 3000);
// //Set Port
// app.set('port',3000);

// mongoose.connection.on('error', function(err) {
//     console.log('Mongodb is not running.');
//     process.exit();
// }).on('connected', function() {
//     app.listen(app.get('port'), function() {
//         console.log('Server started at : http://localhost:' + app.get('port'));
//     });
// });