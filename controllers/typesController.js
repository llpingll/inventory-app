const Types = require("../models/types");
const asyncHandler = require("express-async-handler");

// Display types list on GET.
exports.types_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Types list");
});

// Display Types create form on GET.
exports.types_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Types create GET");
});

// Handle Types create form on POST.
exports.types_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Types create POST");
});
