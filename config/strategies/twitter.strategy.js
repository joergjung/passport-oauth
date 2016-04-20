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
        var user = {};
        var query = {
            'twitter.id': profile.id
        };
        User.findOne(query, function(error, user) {
            if (user) {
                console.log('User found');
                done(null, user);
            } else {
                console.log('User not found');
                var user = new User; 
                // user.email = profile.emails[0].value;
                user.image = profile._json.profile_image_url;
                user.displayName = profile.displayName;

                user.twitter = {};
                user.twitter.id = profile.id;
                user.twitter.token = token;

                // save to DB
                user.save();
                // add user to account
                done(null, user);
            }
        });
    }));
};