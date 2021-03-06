var PoliticiansView = Backbone.View.extend({

  initialize: function() {
    var self = this;
    this.listenTo(this.collection, "reset", this.render);
    this.collection.fetch({
      success: function(data) {
        self.render();
      }
    });
  },

  render: function() {
    this.collection.forEach(function(model) {
      var item = new PoliticianView({
        model: model
      });
      var html = item.render().el;
      // console.log(html);
      this.$el.append(html);
    }, this);
  }

});