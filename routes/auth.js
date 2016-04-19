var express = require('express');
var passport = require('passport');
var router = express.Router();

// google
router.route('/google/callback')
    // use google strategy
    .get(passport.authenticate('google', { 
        successRedirect: '/users/',
        failure: '/error/'
    }));

router.route('/google')
    .get(passport.authenticate('google', {
        // this is google specific
        // define which google APIs we will use (must be enabled in https://console.developers.google.com )
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email']
    }));


// twitter
router.route('/twitter/callback')
    // use twitter strategy
    .get(passport.authenticate('twitter', { 
        successRedirect: '/users/',
        failure: '/error/'
    }));

router.route('/twitter')
    .get(passport.authenticate('twitter'));


// facebook
router.route('/facebook/callback')
    // use twitter strategy
    .get(passport.authenticate('facebook', { 
        successRedirect: '/users/',
        failure: '/error/'
    }));

router.route('/facebook')
    .get(passport.authenticate('facebook', {
        scope: ['email']
    }));

module.exports = router;

