var request = require('request');
var mongoose = require('mongoose');
var Tweets = require('../db/models').Tweets;
var config = require('../config/twitter');

// Twit module
var Twits = require('twit');
var T = new Twits(config.twitter);

// Twitter module
var Twitter = require('twitter');
var client = new Twitter(config.twitter);

module.exports = function(user, callback) {
  var url = 'statuses/user_timeline';
  params = {
    screen_name: user,
    count: 50
  }

  // T.get('followers/ids', {
  //   screen_name: 'gattermeier'
  // }, function(err, data, response) {
  //   console.log(data)
  // })

  T.get(url, params, function(err, data, resp) {
    tweets = data;
    callback(err, data);
  });

  // client.get(url, params, function(err, data, resp) {
  //   console.log(data);
  // })
}