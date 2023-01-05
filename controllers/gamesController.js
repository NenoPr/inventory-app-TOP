const Game = require("../models/game");
const Developer = require("../models/developer");
const Publisher = require("../models/publisher");
const Genre = require("../models/genre");
const Platform = require("../models/platform");
const { body, validationResult } = require("express-validator");

const async = require("async");

// Displays the count of every document in each collection
exports.game_index = (req, res) => {
  async.parallel(
    {
      game_count(callback) {
        Game.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      developer_count(callback) {
        Developer.countDocuments({}, callback);
      },
      publisher_count(callback) {
        Publisher.countDocuments({}, callback);
      },
      genre_count(callback) {
        Genre.countDocuments({}, callback);
      },
      platform_count(callback) {
        Platform.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Games Index",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all Games.
exports.game_list = function (req, res, next) {
  Game.find({}, "title price stock platforms")
    .sort({ title: 1 })
    .populate("platforms")
    .exec(function (err, list_games) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("games/games_list", { title: "Game List", game_list: list_games });
    });
};