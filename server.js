// var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var config = require('./db/config')();

var router = require('./router');

var port = 3000;

MongoClient.connect(config, function(err, db) {
  if (err) throw err;

  app.use("/client", express.static(path.join(__dirname, 'client')));
  app.use("/assets", express.static(path.join(__dirname, 'bower_components')));
  router(app, db);

  app.listen(port, function(err) {
    if (err) throw err;
    console.log('listening on port ', port);
  })
})