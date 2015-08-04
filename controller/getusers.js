// this snipped of code should read all politicians from the API and same relevant data to the db
var request = require('request');
var mongoose = require('mongoose');
var Politician = require('../db/models').Politician;
var Test = mongoose.Schema({
  name: String
});

var getPoliticians = function(body, callback) {

  // Politician.collection.drop();
  var politicians = body.objects;



  // THIS WILL NOT WORK - collection bypasses mongoose and uses native mongodb driver :/
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


  Politician.collection.insert(politicianCollection, null, function(err, data) {
    if (err) {
      console.log(err);
    }
    console.log('Added some elements, ', data.length);
    callback();
  });
}

module.exports = function(callback) {
  var url = 'https://www.govtrack.us/api/v2/role?current=true&limit=600';
  request({
    url: url,
    json: true
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      getPoliticians(body, callback);
    }
  });

}