var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("HLSystemDB");
  dbo.createCollection("equipment", function(err, res) {
    if (err) throw err;
    console.log("Equipment Collection created!");
    db.close();
  });
});