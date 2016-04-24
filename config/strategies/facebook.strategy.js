var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel');

// store API credentials in separate file (add that file to .gitignore)
var facebookKeys = require('../../keys/facebook');

module.exports = function() {
    passport.use(new FacebookStrategy({
        clientID: facebookKeys.clientID,
        clientSecret: facebookKeys.clientSecret,
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
        // if user exists already...
        if (req.user) {
            var query = {};
            // ... check if logged in via google or twitter
            if (req.user.google) {
                console.log('Logged in with Google');
                var query = {
                    'google.id': req.user.google.id
                };
            }
            else if (req.user.twitter) {
                console.log('Logged in with twitter');
                var query = {
                    'twitter.id': req.user.twitter.id
                };
            }
            User.findOne(query, function(error, user) {
                // if either Google or twitter user exists
                if (user) {
                    // add facebook id and token to that existing user
                    user.facebook = {};
                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;
                    // user.facebook.tokenSecret = tokenSecret;

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
                    // user.image = profile._json.image.url;
                    user.displayName = profile.displayName;

                    user.facebook = {};
                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;
                    // save to DB
                    user.save();
                    // add user to account
                    done(null, user);
                }
            });
        }
    }));
};
