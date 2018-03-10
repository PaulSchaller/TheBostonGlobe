var db = require("../models");

// Route for getting all Headlines from the db
module.exports = {
  home: function(req, res) {
    res.render('home');
  },
  headlines: function(req, res) {
    // Grab every document in the Headline collection
    db.Headline.find({})
      .then(function(dbHeadline) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbHeadline);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  },
  saveHeadline: function(req, res) {
    // Save an article
      // Use the article id to find and update its saved boolean
      db.Headline.findOneAndUpdate({ "_id": req.params.id }, { "saved": true})
      // Execute the above query
      .exec(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        else {
          // Or send the document to the browser
          res.send(doc);
        }
      });
  },
  deleteHeadline: function(req,res) {
      // Delete an article
      // Use the article id to find and update its saved boolean
      Headline.findOneAndUpdate({ "_id": req.params.id }, {"saved": false, "notes": []})
      // Execute the above query
      .exec(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        else {
          // Or send the document to the browser
          res.send(doc);
        }
      });
  }
};



