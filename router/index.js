var rebuildPoliticians = require('../controller/getusers');
var rebuildTweets = require('../controller/gettweets');
var politicians = undefined;

module.exports = function(app, db) {
  app.get('/', function(req, res, next) {
    res.redirect('/client/index.html');
  })
  app.get('/test', function(req, res, next) {
    rebuildTweets('gattermeier', function(err, data) {
      if (err) throw err;
      console.log(data);
      res.write('ok');
      res.end;
    });
  })
  app.get('/api/politicians', function(req, res, next) {
    if (politicians !== undefined) {
      res.write(politicians);
      res.end;
    }
  })

  app.get('/api/rebuild/politicians', function(req, res, next) {
    rebuildPoliticians(db, function(err, data) {
      if (err) throw err;
      politicians = data;
      console.log('got politicians?', data);
    });
    res.write('ok');
    res.end;
  });

  app.get('/api/rebuild/tweets/:id', function(req, res, next) {
    var id = req.param('id');
    if (id) {
      console.log(id);
    }

    if (politicians === undefined) {
      console.log('no politicians yet.')
    } else {
      rebuildTweets();
      console.log('we got some politicians');
    }


  });

  app.get('/api/twitter/callback', function(req, res, next) {
    console.log('Twitter callback');
  });

}