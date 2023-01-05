const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
  name: { type: String, required: true },
  founded: { type: Date },
});

// Virtual for book's URL
DeveloperSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/developers/${this._id}`;
});

// Format date death date
DeveloperSchema.virtual("date_founded_formatted").get(function () {
  return this.founded ? DateTime.fromJSDate(this.founded).toLocaleString(DateTime.DATE_MED) : '';
});

// Export model
module.exports = mongoose.model("Developer", DeveloperSchema);
