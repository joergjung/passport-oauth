var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

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

        // user.email = profile.emails[0].value;
        // user.image = profile._json.image.url;
        user.displayName = profile.displayName;

        user.facebook = {};
        user.facebook.id = profile.id;
        user.facebook.token = accessToken;

        // add user to account
        done(null, user);
    }
    ));
};