var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

// Initialize Express
var app = express();

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var Note = require("../models/Note.js");
var Article = require("../models/Headline.js");

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request for the news section of ycombinator
  request("https://www.bostonglobe.com/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $("article").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).children("a").text();
      var summary = $(element).children("a").text();
      var link = $(element).children("a").attr("href");
      // If this found element had both a title and a link
      if (title && link && summary) {
        // Insert the data in the scrapedData db
        db.scrapedData.insert({
          title: title,
          link: link,
          summary: summary
        },

        function(err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
        });
      }
    });
  });
  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});