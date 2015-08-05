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
  console.log('looking for twitter data from user: ', user);
  var url = 'statuses/user_timeline';
  params = {
    screen_name: user,
    count: 50
  }

  T.get(url, params, function(err, data, resp) {
    if (err) throw err;
    callback(err, data);
  });

}