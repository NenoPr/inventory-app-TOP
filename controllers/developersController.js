const Game = require("../models/game");
const Developer = require("../models/developer");
const Publisher = require("../models/publisher");
const Genre = require("../models/genre");
const Platform = require("../models/platform");
const { body, validationResult } = require("express-validator");

const async = require("async");

// Displays the count of every document in each collection
exports.developers_index = (req, res) => {
  Developer.countDocuments({}).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.render("index", {
      title: "Developers Index",
      error: err,
      data: results,
    });
  });
};

// Display list of all Games.
exports.developers_list = function (req, res, next) {
    Developer.find({}, "name founded")
    .sort({ title: 1 })
    .exec(function (err, list_developers) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("developers/developers_list", {
        title: "Developer List",
        developers_list: list_developers,
      });
    });
};
