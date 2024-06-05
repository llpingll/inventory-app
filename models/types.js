const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TypesSchema = new Schema({
  type: { type: String, required: true, minLength: 3, maxLength: 15 },
});

TypesSchema.virtual("url").get(function () {
  // We dont use an arrow function as we'll need this object
  return `/pokemon/type/${this._id}`;
});

module.exports = mongoose.model("Types", TypesSchema);
