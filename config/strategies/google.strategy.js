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
            done(null, profile);
        }
    ));
};
