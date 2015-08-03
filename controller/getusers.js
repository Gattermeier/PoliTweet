// this snipped of code should read all politicians from the API and same relevant data to the db
var request = require('request');
var mongoose = require('mongoose');
var Politician = require('../db/models').Politician;

var getPoliticians = function(body, callback) {
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
  Politician.collection.insert(politicianCollection, callback);
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