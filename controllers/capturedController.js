const Pokemon = require("../models/pokemon");
const Captured = require("../models/captured");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { formatDate, formatDateForInput } = require("./helpers/dateFormatter");

// Display captured list on GET.
exports.captured_list = asyncHandler(async (req, res, next) => {
  const captured = await Captured.find({}).populate("pokemon").exec();
  res.render("captured_list", { title: "Captured Pokemon", captured });
});

// Display detail page for a specific capture.
exports.captured_detail = asyncHandler(async (req, res, next) => {
  const pokemon = await Captured.findById(req.params.id)
    .populate("pokemon")
    .exec();
  if (pokemon === null) {
    const error = new Error("Pokemon not found");
    error.status = 404;
    return next(error);
  }
  res.render("captured_detail", {
    title: "Captured Pokemon Details",
    pokemon,
    formatDate,
  });
});

// Display captured create form on GET.
exports.captured_create_get = asyncHandler(async (req, res, next) => {
  res.render("captured_form", { title: "Create new capture" });
});

// Handle captured create form on POST.
exports.captured_create_post = [
  // Validate and sanitize inputs
  body("name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("First name must be 3 or more letters long.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("nickName").trim().escape(),
  body("capturedLevel")
    .trim()
    .isInt({ min: 1, max: 999 })
    .withMessage("Number must be between 1-999")
    .toInt(),
  body("dateCaptured")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Date must be formatted YYYY-MM-DD")
    .toDate(),

  asyncHandler(async (req, res, next) => {
    // Get list of errors
    const errors = validationResult(req);

    // Check if pokemon exists
    const pokemon = await Pokemon.findOne({ name: req.body.name }).exec();
    const pokemonId = pokemon ? pokemon._id : null;
    // Create custom error if pokemon does not exist
    if (pokemon === null) {
      errors.errors.push({
        value: req.body.name,
        msg: `Pokemon with name of ${req.body.name} does not exist, please enter a valid pokemon or add a new pokemon to the pokedex`,
        path: "pokemon",
        location: "body",
      });
    }

    // If errors exist rerender form with sanitized data
    if (!errors.isEmpty()) {
      res.render("captured_form", {
        title: "Create new capture",
        name: req.body.name,
        nickName: req.body.nickName,
        capturedLevel: req.body.capturedLevel,
        dateCaptured: formatDateForInput(req.body.dateCaptured),
        errors: errors.array(),
      });
      return;
    }

    // Create new captured pokemon
    const capturedPokemon = new Captured({
      pokemon: pokemonId,
      nickName: req.body.nickName,
      capturedLevel: req.body.capturedLevel,
      dateCaptured: req.body.dateCaptured || new Date(),
    });

    await capturedPokemon.save();
    res.redirect(`/pokedex/captured/${capturedPokemon._id}`);
  }),
];

// Handle captured delete form on POST.
exports.captured_delete_post = asyncHandler(async (req, res, next) => {
  await Captured.findByIdAndDelete(req.params.id).exec();
  res.redirect("/pokedex/captured");
});

// Display captured update form on GET.
exports.captured_update_get = asyncHandler(async (req, res, next) => {
  const pokemon = await Captured.findById(req.params.id)
    .populate("pokemon")
    .exec();
  res.render("captured_update_form", {
    title: "Update Captured Pokemon",
    pokemon,
    formatDateForInput,
  });
});

// Handle captured update form on POST.
exports.captured_update_post = [
  // Validate and sanitize inputs
  body("name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("First name must be 3 or more letters long.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("nickName").trim().escape(),
  body("capturedLevel")
    .trim()
    .isInt({ min: 1, max: 999 })
    .withMessage("Number must be between 1-999")
    .toInt(),
  body("dateCaptured")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Date must be formatted YYYY-MM-DD")
    .toDate(),

  asyncHandler(async (req, res, next) => {
    // Get list of errors
    const errors = validationResult(req);

    // Check if pokemon exists
    const pokemon = await Pokemon.findOne({ name: req.body.name }).exec();
    const pokemonId = pokemon ? pokemon._id : null;
    // Create custom error if pokemon does not exist
    if (pokemon === null) {
      errors.errors.push({
        value: req.body.name,
        msg: `Pokemon with name of ${req.body.name} does not exist, please enter a valid pokemon or add a new pokemon to the pokedex`,
        path: "pokemon",
        location: "body",
      });
    }

    // If errors exist rerender form with sanitized data
    if (!errors.isEmpty()) {
      res.render("captured_update_form", {
        title: "Update Existing Captured Pokemon",
        name: req.body.name,
        nickName: req.body.nickName,
        capturedLevel: req.body.capturedLevel,
        dateCaptured: formatDateForInput(req.body.dateCaptured),
        errors: errors.array(),
      });
      return;
    }

    // Create new captured pokemon
    const capturedPokemon = new Captured({
      pokemon: pokemonId,
      nickName: req.body.nickName,
      capturedLevel: req.body.capturedLevel,
      dateCaptured: req.body.dateCaptured || new Date(),
      _id: req.params.id,
    });

    await Captured.findByIdAndUpdate(req.params.id, capturedPokemon, {
      new: true,
    });
    res.redirect(`/pokedex/captured/${capturedPokemon._id}`);
  }),
];
