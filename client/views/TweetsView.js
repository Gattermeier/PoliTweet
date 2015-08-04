var TweetsView = Backbone.View.extend({
  initialize: function() {
    var self = this;
    this.collection.on('reset', this.render);
    this.collection.fetch({
      success: function(data) {
        self.render();
      }
    });
  },
  render: function() {
    console.log('collection render called');
    this.collection.each(function(model) {
      var item = new TweetView({
        model: model
      });
      var html = item.render().el;
      // console.log(html);
      this.$el.append(html);
    }, this)
  }
})