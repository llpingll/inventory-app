const Types = require("../models/types");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display types list on GET.
exports.types_list = asyncHandler(async (req, res, next) => {
  const types = await Types.find().exec();
  res.render("type_list", { title: "Pokemon Types", types: types });
});

// Display Types create form on GET.
exports.types_create_get = (req, res, next) => {
  res.render("type_form", { title: "Create Type", type: {}, errors: [] });
};

// Handle Types create form on POST.
exports.types_create_post = [
  // Validate and sanitize the name field.
  body("name", "Type name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a type object with escaped and trimmed data.
    const type = new Types({ type: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("type_form", {
        title: "Create Type",
        type: type,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Type with same name already exists.
      const typeExists = await Types.findOne({ type: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (typeExists) {
        // Type exists, redirect to its detail page.
        // res.redirect(typeExists.url);
        res.redirect("/pokedex/types"); // Display list of types
      } else {
        await type.save();
        // New type saved. Redirect to type detail page.
        // res.redirect(type.url);
        res.redirect("/pokedex/types"); // Display list of types
      }
    }
  }),
];
