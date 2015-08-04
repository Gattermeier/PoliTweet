var Politicians = Backbone.Collection.extend({
  model: PoliticianModel,
  url: '../api/politicians',
  initialize: function() {
    console.log('init');
  },
  parse: function(data) {
    console.log('PARSE', data);
    return data;
  }
});