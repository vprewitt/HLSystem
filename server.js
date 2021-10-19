/*jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const constants = require("./config/constants.js");
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

// Global Stuff
var mongoURL = "mongodb://localhost:27017/";
// Cross Origin Stuff 
app.use(cors());
app.options('*', cors());
// Parser Stuff
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/'));

// get TEST and sample of how to retrieve payload
app.get('/test', function (req, res) {
    //var fromDate = new Date(req.query.fromDate);
    //var toDate = new Date(req.query.toDate);
    var result = {
        "code": 200,
        "message": "get/test URL Worked, HLSystem Server is running"
    };
    res.send(result);
});
// member Add
app.post('/equipment', function (req, res) {
    var newEquipment = req.body;
    MongoClient.connect(mongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("HLSystemDB");
        dbo.collection("equipment").insertOne(newEquipment, function(err, res) {
          if (err) throw err;
          db.close();
        });
      });
    //
    var result = {
        "code": 200,
        "message": "post/equipment add successful",
    };
    res.send(result);
});

// equipment Find
app.get('/equipment/find', function (req, res) {
    var lastName = req.query.lastName;
    MongoClient.connect(mongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("HLSystemDB");
        var query = { lastName: lastName };
        dbo.collection("members").find(query).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            var results = {
            "code": 200,
            "message": "get/memberFind success",
            "result" : result
            };
            res.send(results);
        });
      });   
});
// equipment List
app.get('/equipment/list', function (req, res) {
    MongoClient.connect(mongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("HLSystemDB");
        var mySort = { date: 1 };
        dbo.collection("equipment").find().sort(mySort).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            var results = {
            "code": 200,
            "message": "get equipment/list",
            "result" : result
            };
            res.send(results);
        });
      });   
});

// equipment get
app.get('/equipment', function (req, res) {
    var id = req.query.id;
    MongoClient.connect(mongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("churchCRM");
        dbo.collection("events").find(ObjectId(id)).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            var results = {
            "code": 200,
            "message": "get/eventInfo success",
            "result" : result
            };
            res.send(results);
        });
      });   
});

// equipment Delete 
app.delete('equipment', function (req,res) {
    console.log("memberDelete");
    console.log(req.body);
});
// Start NODE Server 
app.listen(constants.nodeServer.port, () => console.log('HLSystem NODEJS Server listening on port ' + constants.nodeServer.port + '!'));