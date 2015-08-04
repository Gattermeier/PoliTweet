var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var app = express();

var config = require('./db/config')();
var router = require('./router');

var port = 3000;

mongoose.connect(config, function(err) {
  if (err) throw err;

  app.use("/client", express.static(path.join(__dirname, 'client')));
  app.use("/assets", express.static(path.join(__dirname, 'bower_components')));
  router(app);

  app.listen(port, function(err) {
    if (err) throw err;
    console.log('listening on port ', port);
  })
})