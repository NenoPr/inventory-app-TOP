const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
  name: { type: String, required: true },
  founded: { type: Date },
});

// Virtual for book's URL
PublisherSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/publisher/${this._id}`;
});

PublisherSchema.virtual("date_founded_formatted").get(function () {
  return this.founded ? DateTime.fromJSDate(this.founded).toLocaleString(DateTime.DATE_MED) : '';
});


// Export model
module.exports = mongoose.model("Publisher", PublisherSchema);
