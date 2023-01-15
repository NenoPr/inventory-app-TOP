const Game = require("../models/game");
const Developer = require("../models/developer");
const Publisher = require("../models/publisher");
const Genre = require("../models/genre");
const Platform = require("../models/platform");
const { body, validationResult } = require("express-validator");

const async = require("async");

// Displays the count of every document in each collection
exports.platform_index = (req, res) => {
    Platform.countDocuments({}).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.render("index", {
      title: "Platform Index",
      error: err,
      data: results,
    });
  });
};

// Display list of all Games.
exports.platforms_list = function (req, res, next) {
    Platform.find({}, "name developer released")
    .sort({ title: 1 })
    .exec(function (err, list_platform) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("platforms/platforms_list", {
        title: "Platform List",
        platform_list: list_platform,
      });
    });
};

// Display platform create form on GET.
exports.platforms_create_get = (req, res, next) => {
  res.render("platforms/platform_form", {
    title: "Add a New Platform",
  });
};

// Platform create POST.
exports.platforms_create_post = (req, res, next) => {
  res.render("platforms/platform_form", {
    title: "Add a New Platform",
  });
};
