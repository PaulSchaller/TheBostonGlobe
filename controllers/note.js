var express = require("express");
var request = require("request");

var cheerio = require("cheerio");
var mongoose = require("mongoose");

// Initialize Express
var app = express();

var db = require("../models");

module.exports = {
  getNotes: function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Headline.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbHeadline) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbHeadline);
      })
      .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  },

  deleteNote: function(req, res) {
    // Delete a note
    // Use the note id to find and delete it
    db.Headline.findOneAndUpdate({ "_id": req.params.note_id }, function(err) {
    // Log any errors
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      db.Note.findOneAndRemove({ "_id": req.params.article_id }, {$pull: {"notes": req.params.note_id}})
       // Execute the above query
        .exec(function(err) {
          // Log any errors
          if (err) {
            console.log(err);
            res.send(err);
          }
          else {
            // Or send the note to the browser
            res.send("Note Deleted");
          }
        }
      });
    },

    saveNote: function(req, res) {
      // Route for grabbing a specific Article by id, populate it with it's note
      // Crete a new note and pass the req.body to the entry
      db.Note.create(req.body)
        .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function(dbHeadline) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
          })
        .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
          });
    }
  };
  