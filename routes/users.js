var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  // when signed in, passport will automatically add the user object to the request object
	// render the user template 
  res.render('users', {user: {name: req.user.displayName,
                              image: req.user._json.image.url}});
});

module.exports = router;
