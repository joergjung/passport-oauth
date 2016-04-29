var express = require('express');
var router = express.Router();

// API credentials stored in separate file
var facebookKeys = require('../keys/facebook');

var facebook = require('../services/facebook') (facebookKeys.clientID, facebookKeys.clientSecret);

router.use('/', function(req, res, next) {
	// if not logged in
	if (!req.user) {
		res.redirect('/');
	}
	// if logged in, go to 'GET users listing' below
	next();
});

// GET users listing
router.get('/', function(req, res) {

	if (req.user.facebook) {
		facebook.getImage(req.user.facebook.token,
			function(results) {
				// facebook service (getImage function above) returns results.data (the image url is inside that data object -> results.url below)
				req.user.facebook.image = results.url;
				res.render('users', {user: req.user});
		});
	}
	else {
		// when signed in, passport will automatically add the user object to the request object
		// render the users template 
		res.render('users', {user: req.user});
	}
	
});

module.exports = router;
