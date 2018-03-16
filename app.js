// Basic Dependencies
var express = require('express');
var methodOverride = require('method-override'); // use for put and delete methods
var bodyParser = require('body-parser');
var db = require("./models");
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

//BP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

//Controller
app.use('/', require("./routes/index.js"));  

// //Connection
db.sequelize.sync().then(function() { 
  app.listen(PORT, function(err) {
  if (err) throw err;
  console.log("  🌎 ==> Listening on port " + PORT);
});
}, function (err){
	console.log("Error : " + err);
});


