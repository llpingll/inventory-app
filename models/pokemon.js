const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
  name: { type: String, required: true, maxLength: 15 },
  description: { type: String },
  rarity: {
    type: String,
    required: true,
    enum: ["Common", "Uncommon", "Rare", "Very rare", "Epic", "Legendary"],
  },
  type: [{ type: Schema.Types.ObjectId, ref: "type" }],
});

PokemonSchema.virtual("url").get(function () {
  // We dont use an arrow function as we'll need this object
  return `/pokemon/${this._id}`;
});

module.exports = mongoose.model("Pokemon", PokemonSchema);
