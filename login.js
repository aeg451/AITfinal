//https://code.tutsplus.com/articles/social-authentication-for-nodejs-apps-with-passport--cms-21618
//https://github.com/tutsplus/passport-social
//Will use ^^^ github to help config


//I would love to add a function that will allow the user to 
//post there stat/log onto their twitter or facebook to share it
//Will do more research on that

// facebook app settings - fb.js
module.exports = {
  'appID' : '<your_app_identifier>',
  'appSecret' : '<your_app_secret>',
  'callbackUrl' : 'http://localhost:3000/login/facebook/callback'
}
//we now define a Passport Strategy for authenticating with Facebook using the FacebookStrategy module
passport.use('facebook', new FacebookStrategy({
  clientID        : fbConfig.appID,
  clientSecret    : fbConfig.appSecret,
  callbackURL     : fbConfig.callbackUrl
},
 
  // facebook will send back the tokens and profile
  function(access_token, refresh_token, profile, done) {
    // asynchronous
    process.nextTick(function() {
     
      // find the user in the database based on their facebook id
      User.findOne({ 'id' : profile.id }, function(err, user) {
 
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
          return done(err);
 
          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new User();
 
            // set all of the facebook information in our user model
            newUser.fb.id    = profile.id; // set the users facebook id                 
            newUser.fb.access_token = access_token; // we will save the token that facebook provides to the user                    
            newUser.fb.firstName  = profile.name.givenName;
            newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
            newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
 
            // save our user to the database
            newUser.save(function(err) {
              if (err)
                throw err;
 
              // if successful, return the new user
              return done(null, newUser);
            });
         } 
      });
    });
}));

// route for facebook authentication and login
// different scopes while logging in
router.get('/login/facebook', 
  passport.authenticate('facebook', { scope : 'email' }
));
 
// handle the callback after facebook has authenticated the user
router.get('/login/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/home',
    failureRedirect : '/'
  })
);


////////////////////////

//twitter

// twitter app settings - twitter.js
module.exports = {
    'apikey' : '<your_app_key>',
    'apisecret' : '<you_app_secret>',
    'callbackUrl' : 'http://127.0.0.1:3000/login/twitter/callback'
}

passport.use('twitter', new TwitterStrategy({
    consumerKey     : twitterConfig.apikey,
    consumerSecret  : twitterConfig.apisecret,
    callbackURL     : twitterConfig.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
    process.nextTick(function() { 
 
      User.findOne({ 'twitter.id' : profile.id }, 
        function(err, user) {
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return done(err);
 
            // if the user is found then log them in
            if (user) {
               return done(null, user); // user found, return that user
            } else {
               // if there is no user, create them
               var newUser                 = new User();
 
               // set all of the user data that we need
               newUser.twitter.id          = profile.id;
               newUser.twitter.token       = token;
               newUser.twitter.username = profile.username;
               newUser.twitter.displayName = profile.displayName;
               newUser.twitter.lastStatus = profile._json.status.text;
 
               // save our user into the database
               newUser.save(function(err) {
                 if (err)
                   throw err;
                 return done(null, newUser);
               });
            }
         });
      });
    })
);

// route for twitter authentication and login
// different scopes while logging in
router.get('/login/twitter',  
  passport.authenticate('twitter')
);
 
// handle the callback after facebook has authenticated the user
router.get('/login/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect : '/twitter',
    failureRedirect : '/'
  })
);
 
/* GET Twitter View Page */
router.get('/twitter', isAuthenticated, function(req, res){
  res.render('twitter', { user: req.user });
});


