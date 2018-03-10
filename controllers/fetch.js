var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

var db = require("../models");
var scrape = require("../scripts/scrape.js");


// Scrape data from one site and place it into the mongodb db
module.exports = {
  fetch: function(req, res) {
    scrape(function(articles) {
        console.log("Hi Paul");
        var newArticles = 0;
        for(var i=0; i<articles.length; i++){
          if (!db.Headline.includes(articles[i])) {
                
              // Create a new Headline using the 'articles' object built from scraping
              db.Headline.create(articles[i])
                .then(function(dbHeadline) {
                // View the added result in the console
                console.log(dbHeadline);
                  })
              newArticles++;
            }
          }

       res.json(newArticles);
   
    });
  }
};
