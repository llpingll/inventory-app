const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CapturedSchema = new Schema({
  pokemon: { type: Schema.Types.ObjectId, ref: "Pokemon", required: true },
  nickName: { type: String, maxLength: 15, default: "" },
  capturedLevel: { type: Number, required: true },
  dateCaptured: { type: Date, default: Date.now },
});

CapturedSchema.virtual("url").get(function () {
  // We dont use an arrow function as we'll need this object
  return `/pokemon/captured/${this._id}`;
});

module.exports = mongoose.model("Captured", CapturedSchema);
