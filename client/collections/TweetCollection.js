var TweetCollection = Backbone.Collection.extend({
  model: TweetModel,
  url: '../api/tweets/db',
  initialize: function() {
    console.log('init');
  },
  parse: function(data) {
    console.log('PARSE', data);
    return data;
  }
})