var TweetView = Backbone.View.extend({
  template: _.template("<div id='output' class = 'output'> <div> <%= text %>,  <%= party %>,   </div> </div>"),
  initialize: function() {
    this.render();
    this.listenTo(this.model, "change", this.render)
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    // console.log(this);
    return this;
  }
})