var PoliticiansView = Backbone.View.extend({

  initialize: function() {
    var self = this;
    // this.listenTo(this.collection, "reset", this.render);
    this.collection.fetch({
      success: function(data) {
        // console.log(data.toJSON());
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
      console.log(html);
      this.$el.append(html);
    }, this);
    // var html = this.collection.map(function(model) {
    //   var item = new PoliticianView({
    //     model: model
    //   });
    //   return item.el;
    // });
    // console.log(html);
    // this.$el.prepend(html);
  }

});