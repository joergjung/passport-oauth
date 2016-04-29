var OAuth = require('OAuth').OAuth2;

var Facebook = function(facebookKey, facebookSecret) {
    var key = facebookKey;
    var secret = facebookSecret;

    var oauth = new OAuth(
        key, secret, 'https://graph.facebook.com',
        null,
        'oauth/token',
        null
    );

    var getImage = function(userKey, done) {
        oauth.get(
            'https://graph.facebook.com/v2.3/me/picture?redirect=false&type=large',
            userKey,
            function(err, results, res) {
                results = JSON.parse(results);
                done(results.data);
            }
        );
    };
    return {
        getImage: getImage
    };
};

module.exports = Facebook;
