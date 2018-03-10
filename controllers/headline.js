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
  }
};