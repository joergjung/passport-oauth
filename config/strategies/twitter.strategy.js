var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/userModel');

// store API credentials in separate file (add that file to .gitignore)
var twitterKeys = require('../../keys/twitter');

module.exports = function() {
    passport.use(new TwitterStrategy({
        consumerKey: twitterKeys.clientID,
        consumerSecret: twitterKeys.clientSecret,
        callbackURL: 'http://localhost:3000/auth/twitter/callback',
        passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, done) {
        // if user exists already...
        if (req.user) {
            var query = {};
            // ... check if logged in via google or facebook
            if (req.user.google) {
                console.log('Logged in with Google');
                var query = {
                    'google.id': req.user.google.id
                };
            }
            else if (req.user.facebook) {
                console.log('Logged in with facebook');
                var query = {
                    'facebook.id': req.user.facebook.id
                };
            }
            User.findOne(query, function(error, user) {
                // if either Google or facebook user exists
                if (user) {
                    // add twitter id and token to that existing user
                    user.twitter = {};
                    user.twitter.id = profile.id;
                    user.twitter.token = token;
                    user.twitter.tokenSecret = tokenSecret;

                    user.save();
                    done(null, user);
                }
            });
        }
        else {
            var user = {};
            var query = {
                'twitter.id': profile.id
            };
            User.findOne(query, function(error, user) {
                if (user) {
                    console.log('User found');
                    done(null, user);
                }
                else {
                    console.log('User not found');
                    var user = new User; 
                    // user.email = profile.emails[0].value;
                    user.image = profile._json.profile_image_url;
                    user.displayName = profile.displayName;

                    user.twitter = {};
                    user.twitter.id = profile.id;
                    user.twitter.token = token;
                    user.twitter.tokenSecret = tokenSecret;

                    // save to DB
                    user.save();
                    // add user to account
                    done(null, user);
                }
            });
        }
    }));
};
