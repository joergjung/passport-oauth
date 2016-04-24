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
        var user = {};
        var query = {
            'facebook.id': profile.id
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
    }));
};
