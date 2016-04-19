var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function() {
    passport.use(new FacebookStrategy({
        clientID: '',
        clientSecret: '',
        callbackURL: '',
        passReqToCallback: true
    }));
};