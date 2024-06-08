const Pokemon = require("../models/pokemon");
const asyncHandler = require("express-async-handler");

// Display pokemon list on GET.
exports.pokemon_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon list");
});

// Display detail page for a specific pokemon.
exports.pokemon_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Pokemon detail: ${req.params.id}`);
});

// Display Pokemon create form on GET.
exports.pokemon_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon create GET");
});

// Handle Pokemon create form on POST.
exports.pokemon_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon create POST");
});

// Display Pokemon delete form on GET.
exports.pokemon_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon delete GET");
});

// Handle Pokemon delete form on POST.
exports.pokemon_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon delete POST");
});

// Display Pokemon update form on GET.
exports.pokemon_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon update GET");
});

// Handle Pokemon update form on POST.
exports.pokemon_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon update POST");
});
