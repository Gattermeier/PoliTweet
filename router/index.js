var rebuildPoliticians = require('../controller/getusers');
var rebuildTweets = require('../controller/gettweets');
var politicians = undefined;
module.exports = function(app) {

  app.get('/api/rebuild/politicians', function(req, res, next) {
    rebuildPoliticians(function(err, data) {
      if (err) throw err;
      politicians = data;
      console.log('##################### DONE #####################', data);

    });
    // res.redirect('/login');
  });

  app.get('/api/rebuild/tweets/:id', function(req, res, next) {
    var id = req.param('id');

    if (id) {
      console.log(id);
    }

    if (politicians === undefined) {
      console.log('no politicians yet.')
    } else {
      console.log('we got some politicians');
    }
  });

  app.get('/api/somethingelse', function(req, res, next) {

  });

}