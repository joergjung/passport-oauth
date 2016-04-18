var express = require('express');
var passport = require('passport');
var router = express.Router;

router.route('/google/callback')
    // use google strategy
    .get(passport.authenticate('google', {
        successRedirect: '/users/',
        failure: '/error/'
    }));

router.route('/google')
    .get(passport.authenticate('google', {
        // this is google specific
        // define which google APIs we will use (and are enabled in https://console.developers.google.com )
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

module.exports = router;
