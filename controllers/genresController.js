const Game = require("../models/game");
const Developer = require("../models/developer");
const Publisher = require("../models/publisher");
const Genre = require("../models/genre");
const Platform = require("../models/platform");
const { body, validationResult } = require("express-validator");

const async = require("async");

// Displays the count of every document in each collection
exports.genres_index = (req, res) => {
    Genre.countDocuments({}).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.render("index", {
      title: "Genre Index",
      error: err,
      data: results,
    });
  });
};

// Display list of all Games.
exports.genres_list = function (req, res, next) {
    Genre.find({}, "name description")
    .sort({ title: 1 })
    .exec(function (err, list_genre) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("genre/genres_list", {
        title: "Genre List",
        genre_list: list_genre,
      });
    });
};
