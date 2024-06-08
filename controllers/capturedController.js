const Captured = require("../models/captured");
const asyncHandler = require("express-async-handler");

// Display captured list on GET.
exports.captured_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: captured list");
});

// Display detail page for a specific captured.
exports.captured_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: captured detail: ${req.params.id}`);
});

// Display captured create form on GET.
exports.captured_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: captured create GET");
});

// Handle captured create form on POST.
exports.captured_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: captured create POST");
});

// Display captured delete form on GET.
exports.captured_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: captured delete GET");
});

// Handle captured delete form on POST.
exports.captured_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: captured delete POST");
});

// Display captured update form on GET.
exports.captured_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: captured update GET");
});

// Handle captured update form on POST.
exports.captured_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: captured update POST");
});
