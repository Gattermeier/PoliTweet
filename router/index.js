var rebuildPoliticians = require('../controller/getusers');
var rebuildTweets = require('../controller/gettweets');
var saveTweets = require('../controller/savetweets');

var _ = require('underscore');
var fakedata = require('../fakedata.js').data;

module.exports = function(app, db) {
  app.get('/', function(req, res, next) {
    res.redirect('/client/index.html');
  })

  app.get('/api/tweets/fake', function(req, res, next) {
    res.status(200);
    res.jsonp(fakedata);
  })

  app.get('/test', function(req, res, next) {
    rebuildTweets('gattermeier', function(err, data) {
      if (err) throw err;
      // save tweet data of user
      saveTweets(db, data, function(err, result) {
        if (err) throw err;
      });
      // console.log(data);
      res.write('ok');
      res.end;
    });
  })

  // retrieve politicians from database
  app.get('/api/politicians/db', function(req, res, next) {
    var collection = db.collection('politicians');
    collection.find().toArray(function(err, data) {
      if (err) throw err;
      res.status(200);
      res.jsonp(data);
    })
  })

  // retrieve tweets from database
  app.get('/api/tweets/db', function(req, res, next) {
    var collection = db.collection('tweets');
    collection.find().toArray(function(err, data) {
      if (err) throw err;
      res.status(200)
      res.jsonp(data);
    })
  })

  // rebuild tweets collection in database
  app.get('/api/rebuild/tweets', function(req, res, next) {
    var collectionPol = db.collection('politicians');
    var collectionTweets = db.collection('tweets');

    collectionPol.find().toArray(function(err, politicians) {
      if (err) throw err;
      var TwitterAPILimit = 10;
      _.each(politicians, function(item) {
        if (item.hasOwnProperty('twitterid') && (TwitterAPILimit > 1) && (item.indexedOnce !== true)) {
          TwitterAPILimit--;
          rebuildTweets(item.twitterid, function(err, data) {
            if (err) throw err;
            console.log(data);
            data['party'] = item.party;
            console.log(data);
            console.log('####################################################');
            collectionTweets.insert(data, function(err, result) {
              console.log(result['party']);
              if (err) throw err;
              collectionPol.findOne(item, function(err, pol) {
                pol['indexedOnce'] = true;
                collectionPol.save(pol, {
                  w: 1
                }, function(err, check) {
                  if (err) throw err;
                  // console.log('politician update check:', check);
                })
              });

            })
          });
        } // IF
      });
    })
  })

  // rebuild politician collection in database
  app.get('/api/rebuild/politicians', function(req, res, next) {
    rebuildPoliticians(db, function(err, data) {
      if (err) throw err;
      res.status(200);
      res.jsonp(data);
    });
  });

  app.get('/api/twitter/callback', function(req, res, next) {
    console.log('Twitter callback');
  });

}