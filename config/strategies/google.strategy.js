var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// store API credentials in separate file (add that file to .gitignore)
// googleKeys.clientID
// googleKeys.clientSecret
var googleKeys = require('../../keys/google');

module.exports = function() {
    passport.use(new GoogleStrategy({
        clientID: googleKeys.clientID,
        clientSecret: googleKeys.clientSecret,
        callbackURL: 'http://localhost:3000/auth/google/callback'},
        function(req, accessToken, refreshToken, profile, done){
            var user = {};

            user.email = profile.emails[0].value;
            user.image = profile._json.image.url;
            user.displayName = profile.displayName;
            user.photo = profile._json.cover.coverPhoto.url;

            user.google = {};
            user.google.id = profile.id;
            user.google.token = accessToken;

            // add user to account
            done(null, user);
        }
    ));
};
