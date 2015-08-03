var mongoose = require('mongoose');

var PoliticianSchema = mongoose.Schema({
  name: String,
  party: String,
  twitterid: String
});

var TweetsSchema = mongoose.Schema({
  text: String,
  party: String,
  twitterid: String,
  timestamp: Date
});


exports.Tweets = mongoose.model('Tweets', TweetsSchema);
exports.Politician = mongoose.model('Politician', PoliticianSchema);