var Headline = require("../models/Headline");
var request = require("request");
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

module.exports = function(callback) {
	var articles = [];
	// Make a request for the news section of The Boston Globe
    request("https://www.bostonglobe.com/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    //we grab every article
    $("headline").each(function(i, element) {
      // Save an empty 
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
       result.summary = $(this)
       	.children(".summary")
       	.text();

      if (result.title && result.link && result.summary) {
      		var entry = new Headline(result);
      		articles.push(entry);
      		console.log(entry);
      	}
       })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
       });
     });
 
    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");

	callback(articles);
};