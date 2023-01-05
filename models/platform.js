const mongoose = require("mongoose");
const { DateTime } = require("luxon");


const Schema = mongoose.Schema;

const PlatformSchema = new Schema({
  name: { type: String, required: true },
  developer: { type: String, required: true },
  released: { type: Date },
});

// Virtual for book's URL
PlatformSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/platform/${this._id}`;
});

PlatformSchema.virtual("released_date_formatted").get(function () {
  return this.released ? DateTime.fromJSDate(this.released).toLocaleString(DateTime.DATE_MED) : '';
});

// Export model
module.exports = mongoose.model("Platform", PlatformSchema);
