const Game = require("../models/game");
const Developer = require("../models/developer");
const Publisher = require("../models/publisher");
const Genre = require("../models/genre");
const Platform = require("../models/platform");
const { body, validationResult } = require("express-validator");

const async = require("async");

// Displays the count of every document in each collection
exports.publishers_index = (req, res) => {
    Publisher.countDocuments({}).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.render("index", {
      title: "Publishers Index",
      error: err,
      data: results,
    });
  });
};

// Display list of all Games.
exports.publishers_list = function (req, res, next) {
    Publisher.find({}, "name founded")
    .sort({ title: 1 })
    .exec(function (err, list_publishers) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("publishers/publishers_list", {
        title: "Developer List",
        publishers_list: list_publishers,
      });
    });
};

// Display publisher create form on GET.
exports.publishers_create_get = (req, res, next) => {
  res.render("publishers/publisher_form", {
    title: "Create a New Publisher",
  });
};

// Publisher create POST.
exports.publishers_create_post = (req, res, next) => {
  res.render("publishers/publisher_form", {
    title: "Create a New Publisher",
  });
};
