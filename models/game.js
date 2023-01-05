const mongoose = require("mongoose");
// const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: { type: String, required: true, maxLength: 300 },
  summary: { type: String, maxLength: 3000, required: true },
  announced: { type: Date },
  release_date: { type: Date, required: true },
  genre: { type: [Schema.Types.ObjectId], ref: "Genre", required: true },
  developer: { type: Schema.Types.ObjectId, ref: "Developer", required: true },
  publisher: { type: Schema.Types.ObjectId, ref: "Publisher", required: true },
  platforms: { type: [Schema.Types.ObjectId], ref: "Platform", required: true },
  avgUserRating: { type: Schema.Types.Decimal128 },
  price: { type: Schema.Types.Decimal128 },
  stock: { type: Number, required: true, default: 0 },
  coverImage: { type: String },
  images: {
    type: [String],
    default: undefined,
  },
});

// Virtual for author's URL
GameSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/games/${this._id}`;
});

// Export model
module.exports = mongoose.model("Game", GameSchema);
