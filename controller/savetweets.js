module.exports = function(db, data, callback) {
  // console.log(data);
  var collection = db.collection('tweets');
  collection.drop();
  collection.insert(data, function(err, result) {
    if (err) console.log(err);
    collection.count(function(err, count) {
      console.log('COUNT: ', count);
    })
    callback(err, result.ops);
  });
}