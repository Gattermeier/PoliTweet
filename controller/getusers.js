// this snipped of code should read all politicians from the API and same relevant data to the db
var request = require('request');
var govtrack = require('../config/govtrack');

var getPoliticians = function(db, body, callback) {

  var politicians = body.objects;
  var politicianCollection = [];

  Object.keys(politicians).forEach(function(key) {
    if (politicians[key].person.twitterid !== null) {
      politicianCollection.push({
        name: politicians[key].person.name,
        party: politicians[key].party,
        twitterid: politicians[key].person.twitterid
      });
    }
  });

  var collection = db.collection('politicians');
  collection.drop();
  collection.insert(politicianCollection, function(err, result) {
    if (err) console.log(err);
    callback(err, result);
    // collection.count(function(err, count) {
    //   console.log('COUNT: ', count);
    // })
  });
}

module.exports = function(db, callback) {
  var url = govtrack;
  request({
    url: url,
    json: true
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      getPoliticians(db, body, callback);
    }
  });

}