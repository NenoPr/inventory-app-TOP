#! /usr/bin/env node
// USE THIS SCRIPT WITH THE FOLLOWING COMMAND FROM CLI
// node populatedb <insert mongo databaseurl here>

console.log(
  "This script populates some games, developers, publishers, platforms and genres to a specified database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);
// mongodb+srv://admin:841995@inventory-app-top-clust.fyoko5z.mongodb.net/?retryWrites=true&w=majority

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Game = require("./models/game");
var Developer = require("./models/developer");
var Publisher = require("./models/publisher");
var Platform = require("./models/platform");
var Genre = require("./models/genre");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var games = [];
var developers = [];
var publishers = [];
var platforms = [];
var genres = [];

function developerCreate(name, founded, cb) {
  developerDetail = { name: name };
  if (founded != false) developerDetail.founded = founded;

  var developer = new Developer(developerDetail);

  developer.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Developer: " + developer);
    developers.push(developer);
    cb(null, developer);
  });
}

function publisherCreate(name, founded, cb) {
  publisherDetail = { name: name };
  if (founded != false) publisherDetail.founded = founded;

  var publisher = new Publisher(publisherDetail);

  publisher.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Publisher: " + publisher);
    publishers.push(publisher);
    cb(null, publisher);
  });
}

function genreCreate(name, desc, cb) {
  genreDetail = { name: name };
  if (desc != false) genreDetail.description = desc;

  var genre = new Genre(genreDetail);

  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Genre: " + genre);
    genres.push(genre);
    cb(null, genre);
  });
}

function platformCreate(name, developer, released, cb) {
  platformDetail = { name: name, developer: developer };
  if (released != false) platformDetail.released = released;

  var platform = new Platform(platformDetail);

  platform.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Platform: " + platform);
    platforms.push(platform);
    cb(null, platform);
  });
}

function gameCreate(
  title,
  summary,
  announced,
  release_date,
  genre,
  developer,
  publisher,
  platforms,
  avgUserRating,
  price,
  stock,
  coverImage,
  images,
  cb
) {
  gameDetail = {
    title: title,
    summary: summary,
    release_date: release_date,
    genre: genre,
    developer: developer,
    publisher: publisher,
    platforms: platforms,
  };
  if (announced != false) gameDetail.announced = announced;
  if (avgUserRating != false) gameDetail.avgUserRating = avgUserRating;
  if (price != false) gameDetail.price = price;
  if (stock != false) gameDetail.stock = stock;
  if (coverImage != false) gameDetail.coverImage = coverImage;
  if (images != false) gameDetail.images = images;

  var game = new Game(gameDetail);
  game.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Game: " + game);
    games.push(game);
    cb(null, game);
  });
}

function createDevelopers(cb) {
  async.series(
    [
      function (callback) {
        developerCreate("Nintendo", "1889-09-23", callback);
      },
      function (callback) {
        developerCreate("Ubisoft", "1986-03-28", callback);
      },
      function (callback) {
        developerCreate("Rockstar Games", "1998-12-01", callback);
      },
      function (callback) {
        developerCreate("Electronic Arts", "1982-05-27", callback);
      },
      function (callback) {
        developerCreate("Epic Games", "1991-01-15", callback);
      },
      function (callback) {
        developerCreate("FromSoftware Inc.", "1986-11-01", callback);
      },
      function (callback) {
        developerCreate("Santa Monica Studio", "1999-01-01", callback);
      },
      // 7
      function (callback) {
        developerCreate("Polyphony Digital", "1998-04-02", callback);
      },
      function (callback) {
        developerCreate("HAL Laboratory", "1980-02-21", callback);
      },
      function (callback) {
        developerCreate("Massive Monster", false, callback);
      },
      function (callback) {
        developerCreate("Game Freak", "1989-04-26", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createPublishers(cb) {
  async.series(
    [
      function (callback) {
        publisherCreate("Electronic Arts", "1982-05-27", callback);
      },
      function (callback) {
        publisherCreate("Blizzard Entertainment", "1991-02-08", callback);
      },
      function (callback) {
        publisherCreate("Playstation", "1994-12-03", callback);
      },
      function (callback) {
        publisherCreate("Riot Games", "2006-09-01", callback);
      },
      function (callback) {
        publisherCreate("Activision", "1979-10-01", callback);
      },
      function (callback) {
        publisherCreate("Bandai Namco Entertainment", "2006-03-31", callback);
      },
      function (callback) {
        publisherCreate("Nintendo", "1889-09-23", callback);
      },
      function (callback) {
        publisherCreate("Devolver Digital", "2009-06-25", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createPlatforms(cb) {
  async.series(
    [
      function (callback) {
        platformCreate("Nintendo Switch", "Nintendo", "2017-03-03", callback);
      },
      function (callback) {
        platformCreate("Playstation 5", "Playstation", "2020-11-12", callback);
      },
      function (callback) {
        platformCreate("Xbox Series X", "Microsoft", "2020-11-10", callback);
      },
      function (callback) {
        platformCreate("Windows PC", "Microsoft", false, callback);
      },
      function (callback) {
        platformCreate("Android", "Google", false, callback);
      },
      function (callback) {
        platformCreate("iOS", "Apple", false, callback);
      },
    ],
    // optional callback
    cb
  );
}

function createGenre(cb) {
  async.series(
    [
      function (callback) {
        genreCreate("Fantasy", false, callback);
      },
      function (callback) {
        genreCreate(
          "Science Fiction",
          "Games that involve technologies that do not exist, but have a theoretical chance of being possible one day.",
          callback
        );
      },
      function (callback) {
        genreCreate(
          "FPS",
          "Games that are played from a first person perspective.",
          callback
        );
      },
      function (callback) {
        genreCreate(
          "RPG",
          "Games were developing and/or styling your character is possible through choices, items ect.",
          callback
        );
      },
      function (callback) {
        genreCreate(
          "Strategy",
          "Games where a strategic play style is needed to win the game.",
          callback
        );
      },
      function (callback) {
        genreCreate(
          "Simulation",
          "Games where the simulation of an experience, work or similar is refined to be as realistic as possible.",
          callback
        );
      },
      function (callback) {
        genreCreate(
          "Adventure",
          "A game where you travel,uncover secrets,battle,meet people and anything in between to accomplish a goal.",
          callback
        );
      },
      function (callback) {
        genreCreate("Shooter", "Game with a focus on shooting.", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createGames(cb) {
  async.parallel(
    [
      function (callback) {
        gameCreate(
          "Elden Ring",
          "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. In the Lands Between ruled by Queen Marika the Eternal, the Elden Ring, the source of the Erdtree, has been shattered. Marika's offspring, demigods all, claimed the shards of the Elden Ring known as the Great Runes, and the mad taint of their newfound strength triggered a war: The Shattering. A war that meant abandonment by the Greater Will. And now the guidance of grace will be brought to the Tarnished who were spurned by the grace of gold and exiled from the Lands Between. Ye dead who yet live, your grace long lost, follow the path to the Lands Between beyond the foggy sea to stand before the Elden Ring.",
          false,
          "2022-02-25",
          [genres[0], genres[3], genres[6]],
          developers[6],
          publishers[5],
          [platforms[1], platforms[2], platforms[3]],
          false,
          59.99,
          39,
          false,
          false,
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Splatoon 3",
          "Enter 4-on-4* ink-slinging battles in this colorful action shooter packed with style and attitude. As a squid-like Inkling, quickly cover your surroundings (and opponents) in ink with wild weaponry and swim through your own color to sneak and splat. Dive into the fresh fun with family and friends and make waves as a team. Get splatted by an opponent? No sweat! The goal in Turf War is to cover the most ground, so respawn and jump back into the inky action.",
          "2021-02-17",
          "2022-09-08",
          [genres[6], genres[7]],
          developers[0],
          publishers[6],
          [platforms[0]],
          false,
          49.99,
          24,
          false,
          false,
          callback
        );
      },
      function (callback) {
        gameCreate(
          "God of War Ragnarök",
          "Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.",
          false,
          "2022-11-09",
          [genres[0], genres[3]],
          developers[6],
          publishers[2],
          [platforms[1]],
          false,
          59.99,
          24,
          false,
          false,
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Gran Turismo",
          "Gran Turismo 7 is a racing simulation video game developed by Polyphony Digital and published by Sony Interactive Entertainment. The game is the eighth mainline installment in the Gran Turismo series.",
          false,
          "2022-06-06",
          [genres[2], genres[7]],
          developers[7],
          publishers[2],
          [platforms[1]],
          false,
          59.99,
          12,
          false,
          false,
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Kirby and the Forgotten Land",
          "Kirby and the Forgotten Land is a 2022 platform video game developed by HAL Laboratory and published by Nintendo for the Nintendo Switch. It is the thirteenth mainline installment in the Kirby series, as well as the first game in the series in full 3D, excluding spin-offs.",
          false,
          "2022-03-25",
          [genres[6]],
          developers[8],
          publishers[6],
          [platforms[0]],
          false,
          39.99,
          15,
          false,
          false,
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Cult of the Lamb",
          "Cult of the Lamb is a roguelike video game developed by indie developer Massive Monster and published by Devolver Digital.",
          false,
          "2022-08-11",
          [genres[0], genres[3]],
          developers[9],
          publishers[7],
          [platforms[0], platforms[1], platforms[2], platforms[3]],
          false,
          29.99,
          18,
          false,
          false,
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Pokémon Legends: Arceus",
          "Pokémon Legends: Arceus is a 2022 action role-playing game developed by Game Freak and published by Nintendo and The Pokémon Company for the Nintendo Switch.",
          false,
          "2022-01-28",
          [genres[0], genres[6]],
          developers[10],
          publishers[2],
          [platforms[0]],
          false,
          49.99,
          23,
          false,
          false,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [
    createDevelopers,
    createPublishers,
    createPlatforms,
    createGenre,
    createGames,
  ],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Games Inserted: " + games);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
