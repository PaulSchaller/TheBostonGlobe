// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");


// Initialize Express
var app = express();
// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];
// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);


// Require all models
var db = require("./models");

var port = process.env.PORT || 3000;

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
app.use(bodyParser.json());

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});


//set handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./controllers/fetch.js')
require('./controllers/headline.js')
require('./controllers/note.js')

app.use(function (err, req, res, next) {
  console.log('We had an error.', err)
  res.status(500).json({
    message: err.message
  })
})


db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});