var express = require('express');
var router = express.Router();

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
	// when signed in, passport will automatically add the user object to the request object
	// render the user template 
	res.render('users', {user: {name: req.user.displayName,
                                image: req.user.image,
								photo: req.user.photo
	}});
});

module.exports = router;
